import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import * as list from "./list";
import * as get from "./get";
import * as create from "./create";
import * as update from "./update";
import * as move from "./move";
import * as listByContact from "./listByContact";
import * as createByContact from "./createByContact";
import * as moveByContact from "./moveByContact";

export const operationOptions: INodeProperties = {
  displayName: "Operação",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: { show: { resource: ["card"] } },
  options: [
    { name: "Listar", value: "list", action: "Listar cards" },
    { name: "Obter", value: "get", action: "Obter card por ID" },
    { name: "Criar", value: "create", action: "Criar card" },
    { name: "Atualizar", value: "update", action: "Atualizar card" },
    { name: "Mover", value: "move", action: "Mover card de etapa" },
    {
      name: "Listar por Contato",
      value: "listByContact",
      action: "Listar cards de um contato",
    },
    {
      name: "Criar para Contato",
      value: "createByContact",
      action: "Criar card para um contato",
      description: "Não duplica card do contato no mesmo funil, salvo se forçado",
    },
    {
      name: "Mover por Contato",
      value: "moveByContact",
      action: "Mover cards de um contato",
      description: "Move os cards do contato da etapa de origem para a de destino",
    },
  ],
  default: "list",
};

export const fields: INodeProperties[] = [
  ...list.fields,
  ...get.fields,
  ...create.fields,
  ...update.fields,
  ...move.fields,
  ...listByContact.fields,
  ...createByContact.fields,
  ...moveByContact.fields,
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  operation: string,
  baseUrl: string,
  headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject | IDataObject[]> {
  if (operation === "list") return list.execute(context, i, baseUrl, headers);
  if (operation === "get") return get.execute(context, i, baseUrl, headers);
  if (operation === "create") return create.execute(context, i, baseUrl, headersJson);
  if (operation === "update") return update.execute(context, i, baseUrl, headersJson);
  if (operation === "move") return move.execute(context, i, baseUrl, headersJson);
  if (operation === "listByContact")
    return listByContact.execute(context, i, baseUrl, headers);
  if (operation === "createByContact")
    return createByContact.execute(context, i, baseUrl, headersJson);
  if (operation === "moveByContact")
    return moveByContact.execute(context, i, baseUrl, headersJson);
  throw new Error(`Operação desconhecida: ${operation}`);
}
