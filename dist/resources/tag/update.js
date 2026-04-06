"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "Nome",
        name: "tagName",
        type: "string",
        displayOptions: { show: { resource: ["tag"], operation: ["update"] } },
        default: "",
        description: "Nome da etiqueta (opcional)",
    },
    {
        displayName: "Cor",
        name: "tagColor",
        type: "color",
        displayOptions: { show: { resource: ["tag"], operation: ["update"] } },
        default: "#ffffff",
        description: "Cor da etiqueta (opcional)",
    },
];
// tagId is shared with get.ts; tagFullname, tagCode shared with create.ts
async function execute(context, i, baseUrl, _headers, headersJson) {
    const id = context.getNodeParameter("tagId", i);
    const name = context.getNodeParameter("tagName", i);
    const color = context.getNodeParameter("tagColor", i);
    const fullname = context.getNodeParameter("tagFullname", i);
    const code = context.getNodeParameter("tagCode", i);
    const body = {};
    if (name)
        body.name = name;
    if (color)
        body.color = color;
    if (fullname)
        body.fullname = fullname;
    if (code)
        body.code = code;
    return context.helpers.httpRequest({
        method: "PATCH",
        url: `${baseUrl}/api/client-tag/${id}`,
        headers: headersJson,
        body,
        json: true,
    });
}
//# sourceMappingURL=update.js.map