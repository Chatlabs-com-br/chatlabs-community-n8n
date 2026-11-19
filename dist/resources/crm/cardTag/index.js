"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = exports.operationOptions = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
const R = "cardTag";
const BASE = `${utils_1.INTEGRATION}/crm-tag`;
exports.operationOptions = {
    displayName: "Operação",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: { show: { resource: [R] } },
    options: [
        { name: "Listar", value: "list", action: "Listar etiquetas de card" },
        { name: "Obter", value: "get", action: "Obter etiqueta de card por ID" },
        { name: "Criar", value: "create", action: "Criar etiqueta de card" },
        { name: "Atualizar", value: "update", action: "Atualizar etiqueta de card" },
        { name: "Excluir", value: "delete", action: "Excluir etiqueta de card" },
    ],
    default: "list",
};
exports.fields = [
    {
        displayName: "ID da Etiqueta",
        name: "cardTagId",
        type: "string",
        required: true,
        displayOptions: {
            show: { resource: [R], operation: ["get", "update", "delete"] },
        },
        default: "",
    },
    {
        displayName: "Nome",
        name: "cardTagName",
        type: "string",
        required: true,
        displayOptions: { show: { resource: [R], operation: ["create", "update"] } },
        default: "",
        description: "Único por empresa no CRM",
    },
    {
        displayName: "Cor",
        name: "cardTagColor",
        type: "color",
        displayOptions: { show: { resource: [R], operation: ["create", "update"] } },
        default: "#3B82F6",
        description: "Hexadecimal (#RGB ou #RRGGBB). Obrigatória na atualização.",
    },
    {
        displayName: "É Origem de Lead",
        name: "cardTagIsOrigin",
        type: "boolean",
        displayOptions: { show: { resource: [R], operation: ["create", "update"] } },
        default: false,
        description: "Se a etiqueta representa a origem do lead",
    },
    {
        displayName: "Filtros",
        name: "cardTagFilters",
        type: "collection",
        placeholder: "Adicionar filtro",
        displayOptions: { show: { resource: [R], operation: ["list"] } },
        default: {},
        options: [
            { displayName: "Pesquisa", name: "search", type: "string", default: "" },
            { displayName: "Somente Origem de Lead", name: "is_origin", type: "boolean", default: true },
            { displayName: "ID do Funil (Board)", name: "board_id", type: "string", default: "" },
            { displayName: "Por Página", name: "per_page", type: "number", default: 50 },
            { displayName: "Cursor", name: "cursor", type: "string", default: "" },
        ],
    },
];
async function execute(context, i, operation, baseUrl, headers, headersJson) {
    if (operation === "list") {
        const filters = context.getNodeParameter("cardTagFilters", i, {});
        const qs = (0, utils_1.compact)(filters);
        if (qs.is_origin !== undefined)
            qs.is_origin = qs.is_origin ? 1 : 0;
        return context.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}${BASE}/list`,
            headers,
            qs,
            json: true,
        });
    }
    if (operation === "create" || operation === "update") {
        const body = (0, utils_1.compact)({
            name: context.getNodeParameter("cardTagName", i),
            color: context.getNodeParameter("cardTagColor", i),
            is_origin: context.getNodeParameter("cardTagIsOrigin", i),
        });
        if (operation === "create") {
            return context.helpers.httpRequest({
                method: "POST",
                url: `${baseUrl}${BASE}/store`,
                headers: headersJson,
                body,
                json: true,
            });
        }
        const id = context.getNodeParameter("cardTagId", i);
        return context.helpers.httpRequest({
            method: "PUT",
            url: `${baseUrl}${BASE}/update/${id}`,
            headers: headersJson,
            body,
            json: true,
        });
    }
    const id = context.getNodeParameter("cardTagId", i);
    if (operation === "get") {
        return context.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}${BASE}/load/${id}`,
            headers,
            json: true,
        });
    }
    if (operation === "delete") {
        return context.helpers.httpRequest({
            method: "DELETE",
            url: `${baseUrl}${BASE}/delete/${id}`,
            headers,
            json: true,
        });
    }
    throw new Error(`Operação desconhecida: ${operation}`);
}
//# sourceMappingURL=index.js.map