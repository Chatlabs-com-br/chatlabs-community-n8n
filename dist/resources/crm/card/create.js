"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
const show = { resource: ["card"], operation: ["create"] };
exports.fields = [
    {
        displayName: "Título",
        name: "cardCreateTitle",
        type: "string",
        required: true,
        displayOptions: { show },
        default: "",
    },
    {
        displayName: "ID da Etapa (Coluna)",
        name: "cardCreateColumnId",
        type: "string",
        required: true,
        displayOptions: { show },
        default: "",
        description: "UUID da coluna do funil. Use Funil > Listar para obter.",
    },
    {
        displayName: "Ordem",
        name: "cardCreateOrder",
        type: "number",
        displayOptions: { show },
        default: 0,
        description: "Posição do card na coluna",
    },
    {
        displayName: "Campos Adicionais",
        name: "cardCreateAdditional",
        type: "collection",
        placeholder: "Adicionar campo",
        displayOptions: { show },
        default: {},
        options: [
            { displayName: "Descrição", name: "description", type: "string", default: "" },
            { displayName: "Valor", name: "price", type: "number", default: 0 },
            {
                displayName: "ID do Responsável",
                name: "manager_id",
                type: "string",
                default: "",
                description: "UUID do usuário. Use Usuário > Listar para obter.",
            },
            {
                displayName: "Qualificação (1-5)",
                name: "qualification",
                type: "number",
                typeOptions: { minValue: 1, maxValue: 5 },
                default: 1,
            },
            {
                displayName: "Prioridade",
                name: "priority",
                type: "options",
                options: utils_1.priorityOptions,
                default: "NORMAL",
            },
            {
                displayName: "ID da Origem do Lead",
                name: "lead_origin_id",
                type: "string",
                default: "",
                description: "UUID de uma etiqueta de card marcada como origem",
            },
            { displayName: "ID da Empresa (Lead)", name: "lead_id", type: "string", default: "" },
            { displayName: "ID do Contato", name: "contact_id", type: "string", default: "" },
            {
                displayName: "IDs das Etiquetas",
                name: "tags",
                type: "string",
                default: "",
                description: "UUIDs de etiquetas de card, separados por vírgula",
            },
        ],
    },
];
async function execute(context, i, baseUrl, headersJson) {
    const additional = context.getNodeParameter("cardCreateAdditional", i, {});
    const body = (0, utils_1.compact)({
        ...additional,
        title: context.getNodeParameter("cardCreateTitle", i),
        column_id: context.getNodeParameter("cardCreateColumnId", i),
        order: context.getNodeParameter("cardCreateOrder", i),
    });
    if (additional.tags !== undefined)
        body.tags = (0, utils_1.csv)(additional.tags);
    return context.helpers.httpRequest({
        method: "POST",
        url: `${baseUrl}${utils_1.INTEGRATION}/card/store`,
        headers: headersJson,
        body,
        json: true,
    });
}
//# sourceMappingURL=create.js.map