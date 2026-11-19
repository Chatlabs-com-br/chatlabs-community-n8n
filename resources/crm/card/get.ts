import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION } from "../utils";

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Card",
    name: "cardId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["card"], operation: ["get", "update", "move"] },
    },
    default: "",
    description: "UUID do card (negociação)",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("cardId", i) as string;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}${INTEGRATION}/card/load/${id}`,
    headers,
    json: true,
  });
}
