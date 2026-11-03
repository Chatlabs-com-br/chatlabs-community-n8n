"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "ID do Chat",
        name: "typingIndicatorChatId",
        type: "string",
        required: true,
        displayOptions: {
            show: { resource: ["chat"], operation: ["sendTypingIndicator"] },
        },
        default: "",
        description: "ID do chat onde o indicador será exibido",
    },
    {
        displayName: "Tipo",
        name: "typingIndicatorType",
        type: "options",
        displayOptions: {
            show: { resource: ["chat"], operation: ["sendTypingIndicator"] },
        },
        options: [
            { name: "Digitando", value: "TEXT" },
            { name: "Gravando Áudio", value: "AUDIO" },
        ],
        default: "TEXT",
        description: 'Só WhatsApp API oficial. Some após 25s ou no envio da próxima mensagem. A API oficial não tem "gravando", então AUDIO aparece como "digitando..."',
    },
];
async function execute(context, i, baseUrl, _headers, headersJson) {
    const chatId = context.getNodeParameter("typingIndicatorChatId", i);
    const type = context.getNodeParameter("typingIndicatorType", i);
    return context.helpers.httpRequest({
        method: "POST",
        url: `${baseUrl}/api/chat/${chatId}/typing-indicator`,
        headers: headersJson,
        body: { type },
        json: true,
    });
}
//# sourceMappingURL=sendTypingIndicator.js.map