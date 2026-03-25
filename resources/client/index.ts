import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import * as list from "./list";
import * as get from "./get";
import * as create from "./create";
import * as update from "./update";
import * as del from "./delete";

export const operationOptions: INodeProperties = {
  displayName: "Operação",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: { show: { resource: ["client"] } },
  options: [
    { name: "Listar", value: "list", action: "Listar clientes" },
    { name: "Obter", value: "get", action: "Obter cliente por ID" },
    { name: "Criar", value: "create", action: "Criar cliente" },
    { name: "Atualizar", value: "update", action: "Atualizar cliente" },
    { name: "Deletar", value: "delete", action: "Deletar cliente" },
  ],
  default: "list",
};

export const fields: INodeProperties[] = [
  ...list.fields,
  ...get.fields,
  ...create.fields,
  ...update.fields,
  ...del.fields,
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  operation: string,
  baseUrl: string,
  headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  if (operation === "list") return list.execute(context, i, baseUrl, headers);
  if (operation === "get") return get.execute(context, i, baseUrl, headers);
  if (operation === "create") return create.execute(context, i, baseUrl, headers, headersJson);
  if (operation === "update") return update.execute(context, i, baseUrl, headers, headersJson);
  if (operation === "delete") return del.execute(context, i, baseUrl, headers);
  throw new Error(`Operação desconhecida: ${operation}`);
}
