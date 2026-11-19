import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION, compact, csv, priorityOptions } from "../utils";

// cardId é compartilhado com get.ts
export const fields: INodeProperties[] = [
  {
    displayName: "Campos para Atualizar",
    name: "cardUpdateFields",
    type: "collection",
    placeholder: "Adicionar campo",
    displayOptions: { show: { resource: ["card"], operation: ["update"] } },
    default: {},
    options: [
      { displayName: "Título", name: "title", type: "string", default: "" },
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
      {
        displayName: "Data de Follow-up",
        name: "follow_up_date",
        type: "dateTime",
        default: "",
      },
      { displayName: "ID da Etapa (Coluna)", name: "column_id", type: "string", default: "" },
      { displayName: "Ordem", name: "order", type: "number", default: 0 },
      { displayName: "ID da Empresa (Lead)", name: "lead_id", type: "string", default: "" },
      { displayName: "ID do Contato", name: "contact_id", type: "string", default: "" },
      { displayName: "ID da Origem do Lead", name: "lead_origin_id", type: "string", default: "" },
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
  const id = context.getNodeParameter("cardId", i) as string;
  const updates = context.getNodeParameter("cardUpdateFields", i, {}) as IDataObject;
  const body = compact(updates);
  if (updates.tags !== undefined) body.tags = csv(updates.tags);
  return context.helpers.httpRequest({
    method: "PUT",
    url: `${baseUrl}${INTEGRATION}/card/update/${id}`,
    headers: headersJson,
    body,
    json: true,
  });
}
