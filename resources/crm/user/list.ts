import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION, compact } from "../utils";

const show = { resource: ["user"], operation: ["list"] };

export const fields: INodeProperties[] = [
  {
    displayName: "Filtros",
    name: "userFilters",
    type: "collection",
    placeholder: "Adicionar filtro",
    displayOptions: { show },
    default: {},
    options: [
      { displayName: "Nome", name: "name", type: "string", default: "" },
      { displayName: "E-mail", name: "email", type: "string", default: "" },
      {
        displayName: "ID de Integração",
        name: "integration_id",
        type: "string",
        default: "",
      },
      { displayName: "Por Página", name: "per_page", type: "number", default: 50 },
      { displayName: "Página", name: "page", type: "number", default: 1 },
    ],
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject | IDataObject[]> {
  const filters = context.getNodeParameter("userFilters", i, {}) as IDataObject;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}${INTEGRATION}/user/list`,
    headers,
    qs: compact(filters),
    json: true,
  });
}
