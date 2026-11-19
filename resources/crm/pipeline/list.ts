import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION } from "../utils";

export const fields: INodeProperties[] = [
  {
    displayName: "Pesquisa",
    name: "pipelineSearch",
    type: "string",
    displayOptions: { show: { resource: ["pipeline"], operation: ["list"] } },
    default: "",
    description: "Filtra workspaces pelo nome (opcional)",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject | IDataObject[]> {
  const search = context.getNodeParameter("pipelineSearch", i) as string;
  const qs: IDataObject = {};
  if (search) qs.search = search;
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}${INTEGRATION}/workspace/list`,
    headers,
    qs,
    json: true,
  });
}
