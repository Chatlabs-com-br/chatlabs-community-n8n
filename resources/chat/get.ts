import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Chat",
    name: "chatId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["chat"], operation: ["get", "listMessages"] },
    },
    default: "",
    description: "ID do chat",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("chatId", i) as string;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}/api/chat/${id}`,
    headers,
    json: true,
  });
}
