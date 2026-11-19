import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION, compact, csv, priorityOptions } from "../utils";

const show = { resource: ["card"], operation: ["createByContact"] };

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Contato",
    name: "cardByContactContactId",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
    description: "UUID do contato no CRM",
  },
  {
    displayName: "Título",
    name: "cardByContactTitle",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
  },
  {
    displayName: "ID da Etapa (Coluna)",
    name: "cardByContactColumnId",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
    description: "UUID da coluna do funil. Use Funil > Listar para obter.",
  },
  {
    displayName: "Campos Adicionais",
    name: "cardByContactAdditional",
    type: "collection",
    placeholder: "Adicionar campo",
    displayOptions: { show },
    default: {},
    options: [
      {
        displayName: "Forçar Criação",
        name: "force_create",
        type: "boolean",
        default: false,
        description:
          "Cria mesmo se o contato já tiver uma negociação neste funil",
      },
      {
        displayName: "ID do Chat (Chatlabs)",
        name: "chat_id",
        type: "string",
        default: "",
        description: "Enviado em external_data.chat_id",
      },
      { displayName: "Descrição", name: "description", type: "string", default: "" },
      { displayName: "Valor", name: "price", type: "number", default: 0 },
      { displayName: "ID do Responsável", name: "manager_id", type: "string", default: "" },
      {
        displayName: "Qualificação (1-5)",
        name: "qualification",
        type: "number",
        typeOptions: { minValue: 1, maxValue: 5 },
        default: 1,
      },
      {
        displayName: "Prioridade",
        name: "priority",
        type: "options",
        options: priorityOptions,
        default: "NORMAL",
      },
      { displayName: "ID da Origem do Lead", name: "lead_origin_id", type: "string", default: "" },
      { displayName: "ID da Empresa (Lead)", name: "lead_id", type: "string", default: "" },
      { displayName: "Ordem", name: "order", type: "number", default: 0 },
      {
        displayName: "IDs das Etiquetas",
        name: "tags",
        type: "string",
        default: "",
        description: "UUIDs de etiquetas de card, separados por vírgula",
      },
    ],
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const { chat_id, tags, ...additional } = context.getNodeParameter(
    "cardByContactAdditional",
    i,
    {},
  ) as IDataObject;
  const body = compact({
    ...additional,
    contact_id: context.getNodeParameter("cardByContactContactId", i) as string,
    title: context.getNodeParameter("cardByContactTitle", i) as string,
    column_id: context.getNodeParameter("cardByContactColumnId", i) as string,
  });
  if (tags !== undefined) body.tags = csv(tags);
  if (chat_id) body.external_data = { chat_id };
  return context.helpers.httpRequest({
    method: "POST",
    url: `${baseUrl}${INTEGRATION}/chatlabs/card/store`,
    headers: headersJson,
    body,
    json: true,
  });
}
