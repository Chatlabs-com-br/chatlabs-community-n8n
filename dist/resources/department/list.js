"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "Por Página",
        name: "perPage",
        type: "number",
        displayOptions: {
            show: { resource: ["department"], operation: ["list"] },
        },
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 10,
        description: "Número de setores por página",
    },
    {
        displayName: "Cursor",
        name: "cursor",
        type: "string",
        displayOptions: {
            show: { resource: ["department"], operation: ["list"] },
        },
        default: "",
        description: "Cursor de paginação (opcional)",
    },
    {
        displayName: "Campo de Pesquisa",
        name: "deptField",
        type: "options",
        displayOptions: {
            show: { resource: ["department"], operation: ["list"] },
        },
        options: [
            { name: "Nenhum", value: "" },
            { name: "Nome", value: "NAME" },
        ],
        default: "",
        description: "Campo para filtrar os setores (opcional)",
    },
    {
        displayName: "Valor da Pesquisa",
        name: "deptValue",
        type: "string",
        displayOptions: {
            show: {
                resource: ["department"],
                operation: ["list"],
                deptField: ["NAME"],
            },
        },
        default: "",
        description: "Valor a ser pesquisado",
    },
];
async function execute(context, i, baseUrl, headers) {
    const perPage = context.getNodeParameter("perPage", i);
    const cursor = context.getNodeParameter("cursor", i);
    const field = context.getNodeParameter("deptField", i);
    const value = field ? context.getNodeParameter("deptValue", i) : "";
    const qs = { perPage };
    if (cursor)
        qs.cursor = cursor;
    if (field && value) {
        qs.field = field;
        qs.value = value;
    }
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}/api/department`,
        headers,
        qs,
        json: true,
    });
}
//# sourceMappingURL=list.js.map