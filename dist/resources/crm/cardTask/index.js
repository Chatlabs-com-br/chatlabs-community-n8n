"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = exports.operationOptions = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
const R = "cardTask";
exports.operationOptions = {
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
exports.fields = [
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
async function execute(context, i, operation, baseUrl, headers, headersJson) {
    const cardId = context.getNodeParameter("taskCardId", i);
    if (operation === "list") {
        return context.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}${utils_1.INTEGRATION}/crm-card-task/list`,
            headers,
            qs: (0, utils_1.compact)({
                card_id: cardId,
                search: context.getNodeParameter("taskSearch", i),
            }),
            json: true,
        });
    }
    if (operation === "create") {
        const additional = context.getNodeParameter("taskAdditional", i, {});
        return context.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}${utils_1.INTEGRATION}/crm-card-task/store`,
            headers: headersJson,
            body: (0, utils_1.compact)({
                ...additional,
                card_id: cardId,
                name: context.getNodeParameter("taskName", i),
                status: context.getNodeParameter("taskStatus", i),
                created_by: context.getNodeParameter("taskCreatedBy", i),
            }),
            json: true,
        });
    }
    throw new Error(`Operação desconhecida: ${operation}`);
}
//# sourceMappingURL=index.js.map