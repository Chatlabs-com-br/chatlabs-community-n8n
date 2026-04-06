import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Chat",
    name: "sendMessageChatId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["chat"], operation: ["sendMessage"] },
    },
    default: "",
    description: "ID do chat para enviar a mensagem",
  },
  {
    displayName: "Texto",
    name: "sendMessageText",
    type: "string",
    required: true,
    typeOptions: { rows: 4 },
    displayOptions: {
      show: { resource: ["chat"], operation: ["sendMessage"] },
    },
    default: "",
    description: "Texto da mensagem",
  },
  {
    displayName: "ID do Atendente",
    name: "sendMessageAttendantId",
    type: "string",
    displayOptions: {
      show: { resource: ["chat"], operation: ["sendMessage"] },
    },
    default: "",
    description: "ID do atendente que está enviando a mensagem (opcional)",
  },
  {
    displayName: "Enviar Arquivo",
    name: "sendFile",
    type: "boolean",
    displayOptions: {
      show: { resource: ["chat"], operation: ["sendMessage"] },
    },
    default: false,
    description: "Habilita o envio de um arquivo junto à mensagem",
  },
  {
    displayName: "Binary Property",
    name: "binaryPropertyName",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["chat"],
        operation: ["sendMessage"],
        sendFile: [true],
      },
    },
    default: "data",
    description: "Nome da propriedade binary do item que contém o arquivo",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const chatId = context.getNodeParameter("sendMessageChatId", i) as string;
  const text = context.getNodeParameter("sendMessageText", i) as string;
  const attendantId = context.getNodeParameter("sendMessageAttendantId", i) as string;
  const sendFile = context.getNodeParameter("sendFile", i) as boolean;

  if (sendFile) {
    const binaryPropertyName = context.getNodeParameter("binaryPropertyName", i) as string;
    const binaryData = context.helpers.assertBinaryData(i, binaryPropertyName);
    const buffer = await context.helpers.getBinaryDataBuffer(i, binaryPropertyName);

    const formData = new FormData();
    if (attendantId) formData.append("attendantId", attendantId);
    if (text) formData.append("text", text);
    formData.append(
      "file",
      new Blob([buffer], { type: binaryData.mimeType }),
      binaryData.fileName,
    );

    return context.helpers.httpRequest({
      method: "POST",
      url: `${baseUrl}/api/chat/${chatId}/message`,
      headers,
      body: formData,
    });
  }

  const body: IDataObject = { text };
  if (attendantId) body.attendantId = attendantId;
  return context.helpers.httpRequest({
    method: "POST",
    url: `${baseUrl}/api/chat/${chatId}/message`,
    headers: headersJson,
    body,
    json: true,
  });
}
