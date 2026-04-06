import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [];
// chatId and perPage/cursor are shared with get.ts and list.ts respectively

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("chatId", i) as string;
  const perPage = context.getNodeParameter("perPage", i) as number;
  const cursor = context.getNodeParameter("cursor", i) as string;
  const qs: IDataObject = { perPage };
  if (cursor) qs.cursor = cursor;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}/api/chat/${id}/messages`,
    headers,
    qs,
    json: true,
  });
}
