import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION, compact, csv, priorityOptions } from "../utils";

const show = { resource: ["card"], operation: ["create"] };

export const fields: INodeProperties[] = [
  {
    displayName: "Título",
    name: "cardCreateTitle",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
  },
  {
    displayName: "ID da Etapa (Coluna)",
    name: "cardCreateColumnId",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
    description: "UUID da coluna do funil. Use Funil > Listar para obter.",
  },
  {
    displayName: "Ordem",
    name: "cardCreateOrder",
    type: "number",
    displayOptions: { show },
    default: 0,
    description: "Posição do card na coluna",
  },
  {
    displayName: "Campos Adicionais",
    name: "cardCreateAdditional",
    type: "collection",
    placeholder: "Adicionar campo",
    displayOptions: { show },
    default: {},
    options: [
      { displayName: "Descrição", name: "description", type: "string", default: "" },
      { displayName: "Valor", name: "price", type: "number", default: 0 },
      {
        displayName: "ID do Responsável",
        name: "manager_id",
        type: "string",
        default: "",
        description: "UUID do usuário. Use Usuário > Listar para obter.",
      },
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
      {
        displayName: "ID da Origem do Lead",
        name: "lead_origin_id",
        type: "string",
        default: "",
        description: "UUID de uma etiqueta de card marcada como origem",
      },
      { displayName: "ID da Empresa (Lead)", name: "lead_id", type: "string", default: "" },
      { displayName: "ID do Contato", name: "contact_id", type: "string", default: "" },
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
  const additional = context.getNodeParameter("cardCreateAdditional", i, {}) as IDataObject;
  const body = compact({
    ...additional,
    title: context.getNodeParameter("cardCreateTitle", i) as string,
    column_id: context.getNodeParameter("cardCreateColumnId", i) as string,
    order: context.getNodeParameter("cardCreateOrder", i) as number,
  });
  if (additional.tags !== undefined) body.tags = csv(additional.tags);
  return context.helpers.httpRequest({
    method: "POST",
    url: `${baseUrl}${INTEGRATION}/card/store`,
    headers: headersJson,
    body,
    json: true,
  });
}
