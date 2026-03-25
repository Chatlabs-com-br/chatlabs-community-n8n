"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "ID da Mensagem",
        name: "messageId",
        type: "string",
        required: true,
        displayOptions: {
            show: { resource: ["chat"], operation: ["getMessageFile"] },
        },
        default: "",
        description: "ID da mensagem para obter a URL do arquivo",
    },
];
async function execute(context, i, baseUrl, headers) {
    const id = context.getNodeParameter("messageId", i);
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}/api/chat/message/${id}/file`,
        headers,
        json: true,
    });
}
//# sourceMappingURL=getMessageFile.js.map