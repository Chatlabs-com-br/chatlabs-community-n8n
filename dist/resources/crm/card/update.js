"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
// cardId é compartilhado com get.ts
exports.fields = [
    {
        displayName: "Campos para Atualizar",
        name: "cardUpdateFields",
        type: "collection",
        placeholder: "Adicionar campo",
        displayOptions: { show: { resource: ["card"], operation: ["update"] } },
        default: {},
        options: [
            { displayName: "Título", name: "title", type: "string", default: "" },
            { displayName: "Descrição", name: "description", type: "string", default: "" },
            { displayName: "Valor", name: "price", type: "number", default: 0 },
            { displayName: "ID do Responsável", name: "manager_id", type: "string", default: "" },
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
                displayName: "Data de Follow-up",
                name: "follow_up_date",
                type: "dateTime",
                default: "",
            },
            { displayName: "ID da Etapa (Coluna)", name: "column_id", type: "string", default: "" },
            { displayName: "Ordem", name: "order", type: "number", default: 0 },
            { displayName: "ID da Empresa (Lead)", name: "lead_id", type: "string", default: "" },
            { displayName: "ID do Contato", name: "contact_id", type: "string", default: "" },
            { displayName: "ID da Origem do Lead", name: "lead_origin_id", type: "string", default: "" },
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
    const id = context.getNodeParameter("cardId", i);
    const updates = context.getNodeParameter("cardUpdateFields", i, {});
    const body = (0, utils_1.compact)(updates);
    if (updates.tags !== undefined)
        body.tags = (0, utils_1.csv)(updates.tags);
    return context.helpers.httpRequest({
        method: "PUT",
        url: `${baseUrl}${utils_1.INTEGRATION}/card/update/${id}`,
        headers: headersJson,
        body,
        json: true,
    });
}
//# sourceMappingURL=update.js.map