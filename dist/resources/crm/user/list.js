"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
const utils_1 = require("../utils");
const show = { resource: ["user"], operation: ["list"] };
exports.fields = [
    {
        displayName: "Filtros",
        name: "userFilters",
        type: "collection",
        placeholder: "Adicionar filtro",
        displayOptions: { show },
        default: {},
        options: [
            { displayName: "Nome", name: "name", type: "string", default: "" },
            { displayName: "E-mail", name: "email", type: "string", default: "" },
            {
                displayName: "ID de Integração",
                name: "integration_id",
                type: "string",
                default: "",
            },
            { displayName: "Por Página", name: "per_page", type: "number", default: 50 },
            { displayName: "Página", name: "page", type: "number", default: 1 },
        ],
    },
];
async function execute(context, i, baseUrl, headers) {
    const filters = context.getNodeParameter("userFilters", i, {});
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}${utils_1.INTEGRATION}/user/list`,
        headers,
        qs: (0, utils_1.compact)(filters),
        json: true,
    });
}
//# sourceMappingURL=list.js.map