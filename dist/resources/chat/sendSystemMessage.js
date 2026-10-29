"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "ID do Chat",
        name: "sendSystemMessageChatId",
        type: "string",
        required: true,
        displayOptions: {
            show: { resource: ["chat"], operation: ["sendSystemMessage"] },
        },
        default: "",
        description: "ID do chat para registrar a mensagem de sistema",
    },
    {
        displayName: "Texto",
        name: "sendSystemMessageText",
        type: "string",
        required: true,
        typeOptions: { rows: 4 },
        displayOptions: {
            show: { resource: ["chat"], operation: ["sendSystemMessage"] },
        },
        default: "",
        description: "Texto da mensagem de sistema, por exemplo um aviso de que uma API externa está fora do ar",
    },
    {
        displayName: "ID do Atendente",
        name: "sendSystemMessageAttendantId",
        type: "string",
        displayOptions: {
            show: { resource: ["chat"], operation: ["sendSystemMessage"] },
        },
        default: "",
        description: "ID do atendente associado à mensagem (opcional)",
    },
];
async function execute(context, i, baseUrl, _headers, headersJson) {
    const chatId = context.getNodeParameter("sendSystemMessageChatId", i);
    const text = context.getNodeParameter("sendSystemMessageText", i);
    const attendantId = context.getNodeParameter("sendSystemMessageAttendantId", i);
    const body = { text, subject: "SYSTEM" };
    if (attendantId)
        body.attendantId = attendantId;
    return context.helpers.httpRequest({
        method: "POST",
        url: `${baseUrl}/api/chat/${chatId}/message`,
        headers: headersJson,
        body,
        json: true,
    });
}
//# sourceMappingURL=sendSystemMessage.js.map