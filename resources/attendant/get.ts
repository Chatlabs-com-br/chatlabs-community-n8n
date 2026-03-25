import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Atendente",
    name: "attendantId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["attendant"], operation: ["get"] },
    },
    default: "",
    description: "ID do atendente",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("attendantId", i) as string;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}/api/attendant/${id}`,
    headers,
    json: true,
  });
}
