"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
exports.fields = [
    {
        displayName: "Filtros",
        name: "cardListFilters",
        type: "collection",
        placeholder: "Adicionar filtro",
        displayOptions: { show: { resource: ["card"], operation: ["list"] } },
        default: {},
        options: [
            { displayName: "Pesquisa", name: "search", type: "string", default: "" },
            {
                displayName: "ID da Etapa (Coluna)",
                name: "column_id",
                type: "string",
                default: "",
            },
            {
                displayName: "ID da Empresa (Lead)",
                name: "lead_id",
                type: "string",
                default: "",
            },
            {
                displayName: "Arquivados",
                name: "archived",
                type: "boolean",
                default: false,
            },
        ],
    },
];
async function execute(context, i, baseUrl, headers) {
    const filters = context.getNodeParameter("cardListFilters", i, {});
    const qs = (0, utils_1.compact)(filters);
    if (qs.archived !== undefined)
        qs.archived = qs.archived ? 1 : 0;
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}${utils_1.INTEGRATION}/card/list`,
        headers,
        qs,
        json: true,
    });
}
//# sourceMappingURL=list.js.map