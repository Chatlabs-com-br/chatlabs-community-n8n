"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = exports.operationOptions = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
const R = "cardComment";
exports.operationOptions = {
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
exports.fields = [
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
async function execute(context, i, operation, baseUrl, headers, headersJson) {
    const cardId = context.getNodeParameter("commentCardId", i);
    if (operation === "list") {
        return context.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}${utils_1.INTEGRATION}/crm-card-comment/list`,
            headers,
            qs: (0, utils_1.compact)({
                card_id: cardId,
                search: context.getNodeParameter("commentSearch", i),
            }),
            json: true,
        });
    }
    if (operation === "create") {
        return context.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}${utils_1.INTEGRATION}/crm-card-comment/store`,
            headers: headersJson,
            body: {
                card_id: cardId,
                comment: context.getNodeParameter("commentText", i),
                user_id: context.getNodeParameter("commentUserId", i),
            },
            json: true,
        });
    }
    throw new Error(`Operação desconhecida: ${operation}`);
}
//# sourceMappingURL=index.js.map