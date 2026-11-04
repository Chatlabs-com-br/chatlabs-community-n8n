"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatlabsTrigger = void 0;
class ChatlabsTrigger {
    constructor() {
        this.description = {
            displayName: "Chatlabs Trigger",
            name: "chatlabsTrigger",
            icon: "file:chatlabs.png",
            group: ["trigger"],
            version: 1,
            description: "Inicia um fluxo quando o Chatlabs dispara um evento via Bot Action",
            defaults: {
                name: "Chatlabs Trigger",
            },
            inputs: [],
            outputs: ["main"],
            webhooks: [
                {
                    name: "default",
                    httpMethod: "POST",
                    responseMode: "onReceived",
                    path: "chatlabs-trigger",
                },
            ],
            properties: [
                {
                    displayName: "Cole esta URL na Bot Action do Chatlabs",
                    name: "webhookNotice",
                    type: "notice",
                    default: "",
                },
            ],
        };
    }
    async webhook() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const body = this.getBodyData();
        const headers = this.getHeaderData();
        // Transferência vinda de bloco de ação: o texto é a opção clicada no menu,
        // não uma mensagem real do cliente. Move para actionOption e limpa o texto.
        const message = body.message;
        const quoted = message === null || message === void 0 ? void 0 : message.quotedMessage;
        const fromActionBlock = body.event === "TRANSFER" &&
            (message === null || message === void 0 ? void 0 : message.type) === "INTERACTIVE" &&
            (quoted === null || quoted === void 0 ? void 0 : quoted.sender) === "Bot";
        body.fromActionBlock = fromActionBlock;
        if (fromActionBlock && message) {
            message.actionOption = message.text;
            message.text = "";
        }
        const query = this.getQueryData();
        // Campos prontos para mapear no fluxo, sem expressão longa em cima do body.
        const client = body.client;
        const attendant = body.attendant;
        const file = message === null || message === void 0 ? void 0 : message.file;
        const interactive = message === null || message === void 0 ? void 0 : message.interactive;
        const replyTitle = (reply) => reply === null || reply === void 0 ? void 0 : reply.title;
        // Vindo de bloco de ação, a opção clicada fica só em actionOption.
        const text = fromActionBlock
            ? ""
            : (message === null || message === void 0 ? void 0 : message.text) ||
                replyTitle(interactive === null || interactive === void 0 ? void 0 : interactive.button_reply) ||
                replyTitle(interactive === null || interactive === void 0 ? void 0 : interactive.list_reply) ||
                replyTitle(message === null || message === void 0 ? void 0 : message.button_reply) ||
                replyTitle(message === null || message === void 0 ? void 0 : message.list_reply) ||
                "";
        const data = {
            event: String((_a = body.event) !== null && _a !== void 0 ? _a : "").toUpperCase(),
            chatId: String((_b = body.chatId) !== null && _b !== void 0 ? _b : ""),
            companyId: Number((_c = body.companyId) !== null && _c !== void 0 ? _c : 0),
            attendantId: String((_d = attendant === null || attendant === void 0 ? void 0 : attendant.id) !== null && _d !== void 0 ? _d : ""),
            clientName: String((_e = client === null || client === void 0 ? void 0 : client.name) !== null && _e !== void 0 ? _e : ""),
            clientPhone: String((_f = client === null || client === void 0 ? void 0 : client.phone) !== null && _f !== void 0 ? _f : ""),
            text: String(text).trim(),
            actionOption: String((_g = message === null || message === void 0 ? void 0 : message.actionOption) !== null && _g !== void 0 ? _g : ""),
            messageType: String((_h = message === null || message === void 0 ? void 0 : message.type) !== null && _h !== void 0 ? _h : "TEXT").toUpperCase(),
            fileUrl: String((_j = file === null || file === void 0 ? void 0 : file.url) !== null && _j !== void 0 ? _j : ""),
            fromActionBlock,
            body,
            headers,
            query,
        };
        return {
            workflowData: [[{ json: data }]],
        };
    }
}
exports.ChatlabsTrigger = ChatlabsTrigger;
//# sourceMappingURL=ChatlabsTrigger.node.js.map