"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "ID do Setor",
        name: "departmentId",
        type: "string",
        required: true,
        displayOptions: {
            show: { resource: ["department"], operation: ["get"] },
        },
        default: "",
        description: "ID do setor",
    },
];
async function execute(context, i, baseUrl, headers) {
    const id = context.getNodeParameter("departmentId", i);
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}/api/department/${id}`,
        headers,
        json: true,
    });
}
//# sourceMappingURL=get.js.map