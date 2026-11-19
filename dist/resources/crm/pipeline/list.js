"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
exports.fields = [
    {
        displayName: "Pesquisa",
        name: "pipelineSearch",
        type: "string",
        displayOptions: { show: { resource: ["pipeline"], operation: ["list"] } },
        default: "",
        description: "Filtra workspaces pelo nome (opcional)",
    },
];
async function execute(context, i, baseUrl, headers) {
    const search = context.getNodeParameter("pipelineSearch", i);
    const qs = {};
    if (search)
        qs.search = search;
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}${utils_1.INTEGRATION}/workspace/list`,
        headers,
        qs,
        json: true,
    });
}
//# sourceMappingURL=list.js.map