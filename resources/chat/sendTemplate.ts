import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

const show = { resource: ["chat"], operation: ["sendTemplate"] };

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Telefone Business (Meta)",
    name: "templateWppBusinessPhoneId",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
    description: "ID do telefone WhatsApp Business na Meta (campo metaPhoneId do canal). Veja em Canal → Listar",
  },
  {
    displayName: "Telefone do Cliente",
    name: "templateClientPhone",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
    placeholder: "5551999999999",
    description: "Telefone do cliente com DDI e DDD",
  },
  {
    displayName: "Nome do Cliente",
    name: "templateClientName",
    type: "string",
    displayOptions: { show },
    default: "",
    description: "Nome do cliente (opcional)",
  },
  {
    displayName: "ID do Template (Meta)",
    name: "templateMetaTemplateId",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
    description: "ID do template aprovado na Meta",
  },
  {
    displayName: "Variáveis do Corpo (JSON)",
    name: "templateVariablesBody",
    type: "json",
    displayOptions: { show },
    default: "",
    placeholder: '{ "nome": "Maria", "pedido": "1234" }',
    description: "Variáveis do corpo, pelo nome definido no template (opcional)",
  },
  {
    displayName: "Variáveis do Cabeçalho (JSON)",
    name: "templateVariablesHeader",
    type: "json",
    displayOptions: { show },
    default: "",
    description: "Variáveis do cabeçalho, se o template exigir (opcional)",
  },
  {
    displayName: "Variáveis dos Botões (JSON)",
    name: "templateVariablesButtons",
    type: "json",
    displayOptions: { show },
    default: "",
    placeholder: '[{ "index": 0, "value": "DESCONTO10" }]',
    description: "Lista de variáveis de botões, se o template exigir (opcional)",
  },
  {
    displayName: "Enviar Arquivo",
    name: "templateSendFile",
    type: "boolean",
    displayOptions: { show },
    default: false,
    description: "Envia um arquivo no cabeçalho do template (DOCUMENT, IMAGE ou VIDEO)",
  },
  {
    displayName: "Binary Property",
    name: "templateBinaryPropertyName",
    type: "string",
    required: true,
    displayOptions: { show: { ...show, templateSendFile: [true] } },
    default: "data",
    description: "Nome da propriedade binary do item que contém o arquivo",
  },
  {
    displayName: "Forçar Envio se Houver Chat Aberto",
    name: "templateForceIfOpenChat",
    type: "boolean",
    displayOptions: { show },
    default: false,
    description:
      "Envia mesmo que o cliente já tenha um chat aberto. Com 'Iniciar Chat Encerrado' desligado, usa o chat existente",
  },
  {
    displayName: "Iniciar Chat Encerrado",
    name: "templateChatStartedClosed",
    type: "boolean",
    displayOptions: { show },
    default: false,
    description: "Cria o chat e o encerra em seguida, sem entrar na fila dos atendentes",
  },
  {
    displayName: "Atribuir Chat A",
    name: "templateAssignmentType",
    type: "options",
    displayOptions: { show },
    options: [
      { name: "Ninguém", value: "" },
      { name: "Atendente (e-mail)", value: "user" },
      { name: "Fluxo do Bot", value: "botFlow" },
    ],
    default: "",
    description: "Para onde vai a resposta do cliente (opcional)",
  },
  {
    displayName: "E-mail do Atendente",
    name: "templateAssignmentUserEmail",
    type: "string",
    required: true,
    displayOptions: { show: { ...show, templateAssignmentType: ["user"] } },
    default: "",
  },
  {
    displayName: "ID do Fluxo do Bot",
    name: "templateAssignmentBotFlowId",
    type: "string",
    required: true,
    displayOptions: { show: { ...show, templateAssignmentType: ["botFlow"] } },
    default: "",
  },
];

function parseJson(value: unknown, label: string): unknown {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`${label}: JSON inválido`);
  }
}

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const name = context.getNodeParameter("templateClientName", i) as string;
  const assignmentType = context.getNodeParameter("templateAssignmentType", i) as string;

  const input: IDataObject = {
    type: "WHATSAPP_TEMPLATE",
    forceIfOpenChat: context.getNodeParameter("templateForceIfOpenChat", i) as boolean,
    chatStartedClosed: context.getNodeParameter("templateChatStartedClosed", i) as boolean,
    wppBusinessPhoneId: context.getNodeParameter("templateWppBusinessPhoneId", i) as string,
    client: {
      phoneNumber: context.getNodeParameter("templateClientPhone", i) as string,
      ...(name ? { name } : {}),
    },
    metaTemplateId: context.getNodeParameter("templateMetaTemplateId", i) as string,
  };

  const variablesBody = parseJson(context.getNodeParameter("templateVariablesBody", i, ""), "Variáveis do Corpo");
  const variablesHeader = parseJson(context.getNodeParameter("templateVariablesHeader", i, ""), "Variáveis do Cabeçalho");
  const variablesButtons = parseJson(context.getNodeParameter("templateVariablesButtons", i, ""), "Variáveis dos Botões");
  if (variablesBody) input.variablesBody = variablesBody as IDataObject;
  if (variablesHeader) input.variablesHeader = variablesHeader as IDataObject;
  if (variablesButtons) input.variablesButtons = variablesButtons as IDataObject[];

  if (assignmentType === "user") {
    input.chatAssignment = {
      userEmail: context.getNodeParameter("templateAssignmentUserEmail", i) as string,
    };
  } else if (assignmentType === "botFlow") {
    input.chatAssignment = {
      botFlowId: context.getNodeParameter("templateAssignmentBotFlowId", i) as string,
    };
  }

  if (context.getNodeParameter("templateSendFile", i, false) as boolean) {
    const binaryPropertyName = context.getNodeParameter("templateBinaryPropertyName", i) as string;
    const binaryData = context.helpers.assertBinaryData(i, binaryPropertyName);
    const buffer = await context.helpers.getBinaryDataBuffer(i, binaryPropertyName);

    // No multipart a API lê "input" como JSON em texto e o arquivo vai em "file"
    const formData = new FormData();
    formData.append("input", JSON.stringify(input));
    formData.append(
      "file",
      new Blob([buffer], { type: binaryData.mimeType }),
      binaryData.fileName,
    );

    return context.helpers.httpRequest({
      method: "POST",
      url: `${baseUrl}/api/send-message`,
      headers,
      body: formData,
    });
  }

  return context.helpers.httpRequest({
    method: "POST",
    url: `${baseUrl}/api/send-message`,
    headers: headersJson,
    body: { input },
    json: true,
  });
}
