import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import * as list from "./list";
import * as get from "./get";
import * as listMessages from "./listMessages";
import * as sendMessage from "./sendMessage";
import * as getMessageFile from "./getMessageFile";
import * as transferChat from "./transferChat";
import * as closeChat from "./closeChat";

export const operationOptions: INodeProperties = {
  displayName: "Operação",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: { show: { resource: ["chat"] } },
  options: [
    { name: "Listar", value: "list", action: "Listar chats" },
    { name: "Obter", value: "get", action: "Obter chat por ID" },
    { name: "Listar Mensagens", value: "listMessages", action: "Listar mensagens do chat" },
    { name: "Obter Arquivo de Mensagem", value: "getMessageFile", action: "Obter URL do arquivo de mensagem" },
    { name: "Enviar Mensagem", value: "sendMessage", action: "Enviar mensagem de texto" },
    { name: "Transferir", value: "transferChat", action: "Transferir chat para atendente ou departamento" },
    { name: "Encerrar", value: "closeChat", action: "Encerrar chat ativo" },
  ],
  default: "list",
};

export const fields: INodeProperties[] = [
  ...list.fields,
  ...get.fields,
  ...listMessages.fields,
  ...sendMessage.fields,
  ...getMessageFile.fields,
  ...transferChat.fields,
  ...closeChat.fields,
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
  if (operation === "listMessages") return listMessages.execute(context, i, baseUrl, headers);
  if (operation === "sendMessage") return sendMessage.execute(context, i, baseUrl, headers, headersJson);
  if (operation === "getMessageFile") return getMessageFile.execute(context, i, baseUrl, headers);
  if (operation === "transferChat") return transferChat.execute(context, i, baseUrl, headers, headersJson);
  if (operation === "closeChat") return closeChat.execute(context, i, baseUrl, headers, headersJson);
  throw new Error(`Operação desconhecida: ${operation}`);
}
