import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import * as list from "./list";
import * as get from "./get";

export const operationOptions: INodeProperties = {
  displayName: "Operação",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: { show: { resource: ["attendant"] } },
  options: [
    { name: "Listar", value: "list", action: "Listar atendentes" },
    { name: "Obter", value: "get", action: "Obter atendente por ID" },
  ],
  default: "list",
};

export const fields: INodeProperties[] = [...list.fields, ...get.fields];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  operation: string,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  if (operation === "list") return list.execute(context, i, baseUrl, headers);
  if (operation === "get") return get.execute(context, i, baseUrl, headers);
  throw new Error(`Operação desconhecida: ${operation}`);
}
