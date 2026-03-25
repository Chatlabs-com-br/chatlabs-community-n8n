import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "ID da Etiqueta",
    name: "tagId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["tag"], operation: ["get", "update", "delete"] },
    },
    default: "",
    description: "ID da etiqueta",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("tagId", i) as string;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}/api/client-tag/${id}`,
    headers,
    json: true,
  });
}
