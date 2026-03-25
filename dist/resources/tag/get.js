"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "ID da Etiqueta",
        name: "tagId",
        type: "string",
        required: true,
        displayOptions: {
            show: { resource: ["tag"], operation: ["get", "update", "delete"] },
        },
        default: "",
        description: "ID da etiqueta",
    },
];
async function execute(context, i, baseUrl, headers) {
    const id = context.getNodeParameter("tagId", i);
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}/api/client-tag/${id}`,
        headers,
        json: true,
    });
}
//# sourceMappingURL=get.js.map