import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [];
// tagId is shared with get.ts

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("tagId", i) as string;
  return context.helpers.httpRequest({
    method: "DELETE",
    url: `${baseUrl}/api/client-tag/${id}`,
    headers,
    json: true,
  });
}
