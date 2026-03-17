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