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
        const data = {
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