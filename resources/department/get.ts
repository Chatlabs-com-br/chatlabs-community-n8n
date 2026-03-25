import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Setor",
    name: "departmentId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["department"], operation: ["get"] },
    },
    default: "",
    description: "ID do setor",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("departmentId", i) as string;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}/api/department/${id}`,
    headers,
    json: true,
  });
}
