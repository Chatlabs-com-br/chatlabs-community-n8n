"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "ID do Chat",
        name: "chatId",
        type: "string",
        required: true,
        displayOptions: {
            show: { resource: ["chat"], operation: ["get", "listMessages"] },
        },
        default: "",
        description: "ID do chat",
    },
];
async function execute(context, i, baseUrl, headers) {
    const id = context.getNodeParameter("chatId", i);
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}/api/chat/${id}`,
        headers,
        json: true,
    });
}
//# sourceMappingURL=get.js.map