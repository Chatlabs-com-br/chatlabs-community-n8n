import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION, compact } from "../utils";

const R = "cardTask";

export const operationOptions: INodeProperties = {
  displayName: "Operação",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: { show: { resource: [R] } },
  options: [
    { name: "Listar", value: "list", action: "Listar tarefas de card" },
    { name: "Criar", value: "create", action: "Criar tarefa em card" },
  ],
  default: "list",
};

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Card",
    name: "taskCardId",
    type: "string",
    required: true,
    displayOptions: { show: { resource: [R], operation: ["list", "create"] } },
    default: "",
  },
  {
    displayName: "Pesquisa",
    name: "taskSearch",
    type: "string",
    displayOptions: { show: { resource: [R], operation: ["list"] } },
    default: "",
  },
  {
    displayName: "Nome",
    name: "taskName",
    type: "string",
    required: true,
    displayOptions: { show: { resource: [R], operation: ["create"] } },
    default: "",
  },
  {
    displayName: "Status",
    name: "taskStatus",
    type: "options",
    required: true,
    displayOptions: { show: { resource: [R], operation: ["create"] } },
    options: [
      { name: "Criada", value: "CRM_TASK_CREATED" },
      { name: "Em Andamento", value: "CRM_TASK_IN_PROGRESS" },
      { name: "Finalizada", value: "CRM_TASK_FINISHED" },
    ],
    default: "CRM_TASK_CREATED",
  },
  {
    displayName: "ID do Usuário (Criador)",
    name: "taskCreatedBy",
    type: "string",
    required: true,
    displayOptions: { show: { resource: [R], operation: ["create"] } },
    default: "",
    description: "UUID do usuário do CRM. Use Usuário > Listar para obter.",
  },
  {
    displayName: "Campos Adicionais",
    name: "taskAdditional",
    type: "collection",
    placeholder: "Adicionar campo",
    displayOptions: { show: { resource: [R], operation: ["create"] } },
    default: {},
    options: [
      { displayName: "Descrição", name: "description", type: "string", default: "" },
      {
        displayName: "Data",
        name: "date",
        type: "string",
        default: "",
        placeholder: "2026-12-31",
        description: "Formato YYYY-MM-DD",
      },
      {
        displayName: "Hora",
        name: "hour",
        type: "string",
        default: "",
        placeholder: "14:30",
        description: "Formato HH:mm",
      },
      { displayName: "ID do Responsável", name: "manager_id", type: "string", default: "" },
      {
        displayName: "Notificação",
        name: "notification",
        type: "options",
        options: [
          { name: "E-mail", value: "EMAIL" },
          { name: "WhatsApp", value: "WHATSAPP" },
        ],
        default: "EMAIL",
      },
    ],
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
  const cardId = context.getNodeParameter("taskCardId", i) as string;
  if (operation === "list") {
    return context.helpers.httpRequest({
      method: "GET",
      url: `${baseUrl}${INTEGRATION}/crm-card-task/list`,
      headers,
      qs: compact({
        card_id: cardId,
        search: context.getNodeParameter("taskSearch", i) as string,
      }),
      json: true,
    });
  }
  if (operation === "create") {
    const additional = context.getNodeParameter("taskAdditional", i, {}) as IDataObject;
    return context.helpers.httpRequest({
      method: "POST",
      url: `${baseUrl}${INTEGRATION}/crm-card-task/store`,
      headers: headersJson,
      body: compact({
        ...additional,
        card_id: cardId,
        name: context.getNodeParameter("taskName", i) as string,
        status: context.getNodeParameter("taskStatus", i) as string,
        created_by: context.getNodeParameter("taskCreatedBy", i) as string,
      }),
      json: true,
    });
  }
  throw new Error(`Operação desconhecida: ${operation}`);
}
