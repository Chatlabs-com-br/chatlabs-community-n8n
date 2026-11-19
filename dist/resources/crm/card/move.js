"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
const show = { resource: ["card"], operation: ["move"] };
// cardId é compartilhado com get.ts
exports.fields = [
    {
        displayName: "ID da Etapa de Destino (Coluna)",
        name: "cardMoveColumnId",
        type: "string",
        required: true,
        displayOptions: { show },
        default: "",
    },
    {
        displayName: "Ordem",
        name: "cardMoveOrder",
        type: "number",
        displayOptions: { show },
        default: 0,
        description: "Posição do card na coluna de destino",
    },
    {
        displayName: "Campos Adicionais",
        name: "cardMoveAdditional",
        type: "collection",
        placeholder: "Adicionar campo",
        displayOptions: { show },
        default: {},
        options: [
            {
                displayName: "ID do Motivo de Perda",
                name: "loss_reason_id",
                type: "string",
                default: "",
            },
            {
                displayName: "Observação da Perda",
                name: "loss_reason_note",
                type: "string",
                default: "",
            },
        ],
    },
];
async function execute(context, i, baseUrl, headersJson) {
    const id = context.getNodeParameter("cardId", i);
    const additional = context.getNodeParameter("cardMoveAdditional", i, {});
    const body = (0, utils_1.compact)({
        ...additional,
        column_id: context.getNodeParameter("cardMoveColumnId", i),
        order: context.getNodeParameter("cardMoveOrder", i),
    });
    return context.helpers.httpRequest({
        method: "PUT",
        url: `${baseUrl}${utils_1.INTEGRATION}/card/move/${id}`,
        headers: headersJson,
        body,
        json: true,
    });
}
//# sourceMappingURL=move.js.map