import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION, compact } from "../utils";

const R = "cardComment";

export const operationOptions: INodeProperties = {
  displayName: "Operação",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: { show: { resource: [R] } },
  options: [
    { name: "Listar", value: "list", action: "Listar comentários de card" },
    { name: "Criar", value: "create", action: "Comentar em card" },
  ],
  default: "list",
};

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Card",
    name: "commentCardId",
    type: "string",
    required: true,
    displayOptions: { show: { resource: [R], operation: ["list", "create"] } },
    default: "",
  },
  {
    displayName: "Pesquisa",
    name: "commentSearch",
    type: "string",
    displayOptions: { show: { resource: [R], operation: ["list"] } },
    default: "",
  },
  {
    displayName: "Comentário",
    name: "commentText",
    type: "string",
    typeOptions: { rows: 4 },
    required: true,
    displayOptions: { show: { resource: [R], operation: ["create"] } },
    default: "",
  },
  {
    displayName: "ID do Usuário (Autor)",
    name: "commentUserId",
    type: "string",
    required: true,
    displayOptions: { show: { resource: [R], operation: ["create"] } },
    default: "",
    description: "UUID do usuário do CRM. Use Usuário > Listar para obter.",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  operation: string,
  baseUrl: string,
  headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject | IDataObject[]> {
  const cardId = context.getNodeParameter("commentCardId", i) as string;
  if (operation === "list") {
    return context.helpers.httpRequest({
      method: "GET",
      url: `${baseUrl}${INTEGRATION}/crm-card-comment/list`,
      headers,
      qs: compact({
        card_id: cardId,
        search: context.getNodeParameter("commentSearch", i) as string,
      }),
      json: true,
    });
  }
  if (operation === "create") {
    return context.helpers.httpRequest({
      method: "POST",
      url: `${baseUrl}${INTEGRATION}/crm-card-comment/store`,
      headers: headersJson,
      body: {
        card_id: cardId,
        comment: context.getNodeParameter("commentText", i) as string,
        user_id: context.getNodeParameter("commentUserId", i) as string,
      },
      json: true,
    });
  }
  throw new Error(`Operação desconhecida: ${operation}`);
}
