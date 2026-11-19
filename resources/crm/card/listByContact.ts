import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION, compact, csv } from "../utils";

export const fields: INodeProperties[] = [
  {
    displayName: "Filtros",
    name: "cardByContactFilters",
    type: "collection",
    placeholder: "Adicionar filtro",
    displayOptions: {
      show: { resource: ["card"], operation: ["listByContact"] },
    },
    default: {},
    description:
      "Informe ao menos um: ID do contato, IDs dos contatos, ID da empresa ou ID da etapa",
    options: [
      { displayName: "ID do Contato", name: "contact_id", type: "string", default: "" },
      {
        displayName: "IDs dos Contatos",
        name: "contact_ids",
        type: "string",
        default: "",
        description: "UUIDs de contatos, separados por vírgula",
      },
      { displayName: "ID da Empresa (Lead)", name: "lead_id", type: "string", default: "" },
      { displayName: "ID da Etapa (Coluna)", name: "column_id", type: "string", default: "" },
      { displayName: "Pesquisa", name: "search", type: "string", default: "" },
    ],
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject | IDataObject[]> {
  const filters = context.getNodeParameter("cardByContactFilters", i, {}) as IDataObject;
  const qs = compact(filters);
  if (filters.contact_ids !== undefined) {
    const ids = csv(filters.contact_ids);
    if (ids.length) qs.contact_ids = ids;
    else delete qs.contact_ids;
  }
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}${INTEGRATION}/chatlabs/card/list`,
    headers,
    qs,
    arrayFormat: "brackets",
    json: true,
  });
}
