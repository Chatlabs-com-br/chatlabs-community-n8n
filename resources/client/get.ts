import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Cliente",
    name: "clientId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["get", "update", "delete"],
      },
    },
    default: "",
    description: "ID do cliente",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("clientId", i) as string;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}/api/client/${id}`,
    headers,
    json: true,
  });
}
