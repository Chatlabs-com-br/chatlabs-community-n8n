"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "ID do Cliente",
        name: "clientId",
        type: "string",
        required: true,
        displayOptions: {
            show: {
                resource: ["client"],
                operation: ["get", "update", "delete"],
            },
        },
        default: "",
        description: "ID do cliente",
    },
];
async function execute(context, i, baseUrl, headers) {
    const id = context.getNodeParameter("clientId", i);
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}/api/client/${id}`,
        headers,
        json: true,
    });
}
//# sourceMappingURL=get.js.map