import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION, compact } from "../utils";

export const fields: INodeProperties[] = [
  {
    displayName: "Filtros",
    name: "cardListFilters",
    type: "collection",
    placeholder: "Adicionar filtro",
    displayOptions: { show: { resource: ["card"], operation: ["list"] } },
    default: {},
    options: [
      { displayName: "Pesquisa", name: "search", type: "string", default: "" },
      {
        displayName: "ID da Etapa (Coluna)",
        name: "column_id",
        type: "string",
        default: "",
      },
      {
        displayName: "ID da Empresa (Lead)",
        name: "lead_id",
        type: "string",
        default: "",
      },
      {
        displayName: "Arquivados",
        name: "archived",
        type: "boolean",
        default: false,
      },
    ],
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject | IDataObject[]> {
  const filters = context.getNodeParameter("cardListFilters", i, {}) as IDataObject;
  const qs = compact(filters);
  if (qs.archived !== undefined) qs.archived = qs.archived ? 1 : 0;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}${INTEGRATION}/card/list`,
    headers,
    qs,
    json: true,
  });
}
