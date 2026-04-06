import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "ID da Mensagem",
    name: "messageId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["chat"], operation: ["getMessageFile"] },
    },
    default: "",
    description: "ID da mensagem para obter a URL do arquivo",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("messageId", i) as string;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}/api/chat/message/${id}/file`,
    headers,
    json: true,
  });
}
