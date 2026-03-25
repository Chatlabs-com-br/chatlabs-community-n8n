import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [];

export async function execute(
  context: IExecuteFunctions,
  _i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}/api/channel`,
    headers,
    json: true,
  });
}
