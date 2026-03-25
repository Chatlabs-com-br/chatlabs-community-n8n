"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "Por Página",
        name: "perPage",
        type: "number",
        displayOptions: { show: { resource: ["tag"], operation: ["list"] } },
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 10,
        description: "Número de etiquetas por página",
    },
    {
        displayName: "Cursor",
        name: "cursor",
        type: "string",
        displayOptions: { show: { resource: ["tag"], operation: ["list"] } },
        default: "",
        description: "Cursor de paginação (opcional)",
    },
];
async function execute(context, i, baseUrl, headers) {
    const perPage = context.getNodeParameter("perPage", i);
    const cursor = context.getNodeParameter("cursor", i);
    const qs = { perPage };
    if (cursor)
        qs.cursor = cursor;
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}/api/client-tag`,
        headers,
        qs,
        json: true,
    });
}
//# sourceMappingURL=list.js.map