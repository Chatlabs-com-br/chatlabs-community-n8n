import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "Por Página",
    name: "perPage",
    type: "number",
    displayOptions: { show: { resource: ["tag"], operation: ["list"] } },
    typeOptions: { minValue: 1, maxValue: 100 },
    default: 10,
    description: "Número de etiquetas por página",
  },
  {
    displayName: "Cursor",
    name: "cursor",
    type: "string",
    displayOptions: { show: { resource: ["tag"], operation: ["list"] } },
    default: "",
    description: "Cursor de paginação (opcional)",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const perPage = context.getNodeParameter("perPage", i) as number;
  const cursor = context.getNodeParameter("cursor", i) as string;
  const qs: IDataObject = { perPage };
  if (cursor) qs.cursor = cursor;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}/api/client-tag`,
    headers,
    qs,
    json: true,
  });
}
