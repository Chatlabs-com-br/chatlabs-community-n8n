import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [];
// clientId is shared with get.ts

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("clientId", i) as string;
  return context.helpers.httpRequest({
    method: "DELETE",
    url: `${baseUrl}/api/client/${id}`,
    headers,
    json: true,
  });
}
