"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
exports.fields = [
    {
        displayName: "Filtros",
        name: "cardByContactFilters",
        type: "collection",
        placeholder: "Adicionar filtro",
        displayOptions: {
            show: { resource: ["card"], operation: ["listByContact"] },
        },
        default: {},
        description: "Informe ao menos um: ID do contato, IDs dos contatos, ID da empresa ou ID da etapa",
        options: [
            { displayName: "ID do Contato", name: "contact_id", type: "string", default: "" },
            {
                displayName: "IDs dos Contatos",
                name: "contact_ids",
                type: "string",
                default: "",
                description: "UUIDs de contatos, separados por vírgula",
            },
            { displayName: "ID da Empresa (Lead)", name: "lead_id", type: "string", default: "" },
            { displayName: "ID da Etapa (Coluna)", name: "column_id", type: "string", default: "" },
            { displayName: "Pesquisa", name: "search", type: "string", default: "" },
        ],
    },
];
async function execute(context, i, baseUrl, headers) {
    const filters = context.getNodeParameter("cardByContactFilters", i, {});
    const qs = (0, utils_1.compact)(filters);
    if (filters.contact_ids !== undefined) {
        const ids = (0, utils_1.csv)(filters.contact_ids);
        if (ids.length)
            qs.contact_ids = ids;
        else
            delete qs.contact_ids;
    }
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}${utils_1.INTEGRATION}/chatlabs/card/list`,
        headers,
        qs,
        arrayFormat: "brackets",
        json: true,
    });
}
//# sourceMappingURL=listByContact.js.map