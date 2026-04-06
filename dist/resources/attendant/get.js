"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "ID do Atendente",
        name: "attendantId",
        type: "string",
        required: true,
        displayOptions: {
            show: { resource: ["attendant"], operation: ["get"] },
        },
        default: "",
        description: "ID do atendente",
    },
];
async function execute(context, i, baseUrl, headers) {
    const id = context.getNodeParameter("attendantId", i);
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}/api/attendant/${id}`,
        headers,
        json: true,
    });
}
//# sourceMappingURL=get.js.map