"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "Nome",
        name: "tagName",
        type: "string",
        required: true,
        displayOptions: { show: { resource: ["tag"], operation: ["create"] } },
        default: "",
        description: "Nome da etiqueta",
    },
    {
        displayName: "Cor",
        name: "tagColor",
        type: "color",
        displayOptions: { show: { resource: ["tag"], operation: ["create"] } },
        default: "#ffffff",
        description: "Cor da etiqueta",
    },
    {
        displayName: "Nome Completo",
        name: "tagFullname",
        type: "string",
        displayOptions: {
            show: { resource: ["tag"], operation: ["create", "update"] },
        },
        default: "",
        description: "Nome completo da etiqueta (opcional)",
    },
    {
        displayName: "Código",
        name: "tagCode",
        type: "string",
        displayOptions: {
            show: { resource: ["tag"], operation: ["create", "update"] },
        },
        default: "",
        description: "Código da etiqueta (opcional)",
    },
];
async function execute(context, i, baseUrl, _headers, headersJson) {
    const name = context.getNodeParameter("tagName", i);
    const color = context.getNodeParameter("tagColor", i);
    const fullname = context.getNodeParameter("tagFullname", i);
    const code = context.getNodeParameter("tagCode", i);
    const body = { name, color };
    if (fullname)
        body.fullname = fullname;
    if (code)
        body.code = code;
    return context.helpers.httpRequest({
        method: "POST",
        url: `${baseUrl}/api/client-tag`,
        headers: headersJson,
        body,
        json: true,
    });
}
//# sourceMappingURL=create.js.map