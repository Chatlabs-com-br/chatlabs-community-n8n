"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
const show = { resource: ["card"], operation: ["moveByContact"] };
exports.fields = [
    {
        displayName: "ID do Contato",
        name: "cardMoveByContactContactId",
        type: "string",
        required: true,
        displayOptions: { show },
        default: "",
        description: "UUID do contato no CRM",
    },
    {
        displayName: "ID da Etapa de Origem (Coluna)",
        name: "cardMoveByContactOriginColumnId",
        type: "string",
        required: true,
        displayOptions: { show },
        default: "",
        description: "Move os cards do contato que estão nesta coluna",
    },
    {
        displayName: "ID da Etapa de Destino (Coluna)",
        name: "cardMoveByContactDestinationColumnId",
        type: "string",
        required: true,
        displayOptions: { show },
        default: "",
    },
    {
        displayName: "Ordem",
        name: "cardMoveByContactOrder",
        type: "number",
        displayOptions: { show },
        default: 0,
    },
];
async function execute(context, i, baseUrl, headersJson) {
    const body = {
        contact_id: context.getNodeParameter("cardMoveByContactContactId", i),
        origin_column_id: context.getNodeParameter("cardMoveByContactOriginColumnId", i),
        destination_column_id: context.getNodeParameter("cardMoveByContactDestinationColumnId", i),
        order: context.getNodeParameter("cardMoveByContactOrder", i),
    };
    return context.helpers.httpRequest({
        method: "PUT",
        url: `${baseUrl}${utils_1.INTEGRATION}/chatlabs/card/move`,
        headers: headersJson,
        body,
        json: true,
    });
}
//# sourceMappingURL=moveByContact.js.map