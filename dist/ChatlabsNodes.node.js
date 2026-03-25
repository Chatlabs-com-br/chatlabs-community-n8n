"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatlabsNodes = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const attendant = __importStar(require("./resources/attendant"));
const channel = __importStar(require("./resources/channel"));
const chat = __importStar(require("./resources/chat"));
const client = __importStar(require("./resources/client"));
const tag = __importStar(require("./resources/tag"));
const department = __importStar(require("./resources/department"));
class ChatlabsNodes {
    constructor() {
        this.description = {
            displayName: "Chatlabs",
            name: "chatlabsNodes",
            icon: "file:chatlabs.png",
            group: ["output"],
            version: 1,
            subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
            description: "Interaja com a API do Chatlabs",
            defaults: {
                name: "Chatlabs",
            },
            inputs: ["main"],
            outputs: ["main"],
            credentials: [
                {
                    name: "chatlabsApi",
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: "Recurso",
                    name: "resource",
                    type: "options",
                    noDataExpression: true,
                    options: [
                        { name: "Atendente", value: "attendant" },
                        { name: "Canal", value: "channel" },
                        { name: "Chat", value: "chat" },
                        { name: "Cliente", value: "client" },
                        { name: "Etiqueta", value: "tag" },
                        { name: "Setor", value: "department" },
                    ],
                    default: "attendant",
                },
                attendant.operationOptions,
                channel.operationOptions,
                chat.operationOptions,
                client.operationOptions,
                tag.operationOptions,
                department.operationOptions,
                ...attendant.fields,
                ...channel.fields,
                ...chat.fields,
                ...client.fields,
                ...tag.fields,
                ...department.fields,
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials("chatlabsApi");
        const baseUrl = credentials.baseUrl.replace(/\/$/, "");
        const apiKey = credentials.apiKey;
        const headers = {
            Authorization: `Bearer ${apiKey}`,
            accept: "application/json",
        };
        const headersJson = { ...headers, "Content-Type": "application/json" };
        for (let i = 0; i < items.length; i++) {
            const resource = this.getNodeParameter("resource", i);
            const operation = this.getNodeParameter("operation", i);
            try {
                let responseData;
                if (resource === "attendant") {
                    responseData = await attendant.execute(this, i, operation, baseUrl, headers);
                }
                else if (resource === "channel") {
                    responseData = await channel.execute(this, i, operation, baseUrl, headers);
                }
                else if (resource === "chat") {
                    responseData = await chat.execute(this, i, operation, baseUrl, headers, headersJson);
                }
                else if (resource === "client") {
                    responseData = await client.execute(this, i, operation, baseUrl, headers, headersJson);
                }
                else if (resource === "tag") {
                    responseData = await tag.execute(this, i, operation, baseUrl, headers, headersJson);
                }
                else if (resource === "department") {
                    responseData = await department.execute(this, i, operation, baseUrl, headers);
                }
                else {
                    throw new Error(`Recurso desconhecido: ${resource}`);
                }
                returnData.push({ json: responseData, pairedItem: { item: i } });
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: { error: error.message },
                        pairedItem: { item: i },
                    });
                    continue;
                }
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error, { itemIndex: i });
            }
        }
        return [returnData];
    }
}
exports.ChatlabsNodes = ChatlabsNodes;
//# sourceMappingURL=ChatlabsNodes.node.js.map