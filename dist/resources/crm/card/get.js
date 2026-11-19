"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
exports.fields = [
    {
        displayName: "ID do Card",
        name: "cardId",
        type: "string",
        required: true,
        displayOptions: {
            show: { resource: ["card"], operation: ["get", "update", "move"] },
        },
        default: "",
        description: "UUID do card (negociação)",
    },
];
async function execute(context, i, baseUrl, headers) {
    const id = context.getNodeParameter("cardId", i);
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}${utils_1.INTEGRATION}/card/load/${id}`,
        headers,
        json: true,
    });
}
//# sourceMappingURL=get.js.map