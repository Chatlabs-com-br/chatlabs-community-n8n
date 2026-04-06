"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "ID do Chat",
        name: "closeChatId",
        type: "string",
        required: true,
        displayOptions: {
            show: { resource: ["chat"], operation: ["closeChat"] },
        },
        default: "",
        description: "ID do chat a ser encerrado",
    },
    {
        displayName: "Enviar Avaliação ao Cliente",
        name: "sendFeedbackToCustomer",
        type: "boolean",
        displayOptions: {
            show: { resource: ["chat"], operation: ["closeChat"] },
        },
        default: false,
        description: "Envia avaliação de atendimento ao cliente ao encerrar",
    },
    {
        displayName: "Enviar Mensagem Final",
        name: "sendFinalMessage",
        type: "boolean",
        displayOptions: {
            show: { resource: ["chat"], operation: ["closeChat"] },
        },
        default: false,
        description: "Envia a mensagem de encerramento configurada na empresa ao cliente",
    },
];
async function execute(context, i, baseUrl, _headers, headersJson) {
    const chatId = context.getNodeParameter("closeChatId", i);
    const sendFeedbackToCustomer = context.getNodeParameter("sendFeedbackToCustomer", i);
    const sendFinalMessage = context.getNodeParameter("sendFinalMessage", i);
    const body = { sendFeedbackToCustomer, sendFinalMessage };
    return context.helpers.httpRequest({
        method: "POST",
        url: `${baseUrl}/api/chat/${chatId}/close`,
        headers: headersJson,
        body,
        json: true,
    });
}
//# sourceMappingURL=closeChat.js.map