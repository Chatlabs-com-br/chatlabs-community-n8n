import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import * as list from "./list";

export const operationOptions: INodeProperties = {
  displayName: "Operação",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: { show: { resource: ["channel"] } },
  options: [
    { name: "Listar", value: "list", action: "Listar canais conectados" },
  ],
  default: "list",
};

export const fields: INodeProperties[] = [...list.fields];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  operation: string,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  if (operation === "list") return list.execute(context, i, baseUrl, headers);
  throw new Error(`Operação desconhecida: ${operation}`);
}
