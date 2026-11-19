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
exports.ChatlabsCrm = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const pipeline = __importStar(require("./resources/crm/pipeline"));
const card = __importStar(require("./resources/crm/card"));
const cardComment = __importStar(require("./resources/crm/cardComment"));
const cardTask = __importStar(require("./resources/crm/cardTask"));
const contact = __importStar(require("./resources/crm/contact"));
const company = __importStar(require("./resources/crm/company"));
const cardTag = __importStar(require("./resources/crm/cardTag"));
const user = __importStar(require("./resources/crm/user"));
class ChatlabsCrm {
    constructor() {
        this.description = {
            displayName: "Chatlabs CRM",
            name: "chatlabsCrm",
            icon: "file:chatlabs.png",
            group: ["output"],
            version: 1,
            subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
            description: "Interaja com a API de integração do CRM do Chatlabs",
            defaults: {
                name: "Chatlabs CRM",
            },
            inputs: ["main"],
            outputs: ["main"],
            credentials: [
                {
                    name: "chatlabsCrmApi",
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
                        { name: "Card (Negociação)", value: "card" },
                        { name: "Comentário de Card", value: "cardComment" },
                        { name: "Contato", value: "contact" },
                        { name: "Empresa", value: "company" },
                        { name: "Etiqueta de Card", value: "cardTag" },
                        { name: "Funil", value: "pipeline" },
                        { name: "Tarefa de Card", value: "cardTask" },
                        { name: "Usuário", value: "user" },
                    ],
                    default: "card",
                },
                card.operationOptions,
                cardComment.operationOptions,
                contact.operationOptions,
                company.operationOptions,
                cardTag.operationOptions,
                pipeline.operationOptions,
                cardTask.operationOptions,
                user.operationOptions,
                ...card.fields,
                ...cardComment.fields,
                ...contact.fields,
                ...company.fields,
                ...cardTag.fields,
                ...pipeline.fields,
                ...cardTask.fields,
                ...user.fields,
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials("chatlabsCrmApi");
        const baseUrl = credentials.baseUrl.replace(/\/+$/, "");
        const tenantToken = credentials.tenantToken;
        const systemToken = credentials.systemToken;
        const headers = {
            "tenant-token": tenantToken,
            accept: "application/json",
        };
        if (systemToken)
            headers["system-token"] = systemToken;
        const headersJson = { ...headers, "Content-Type": "application/json" };
        for (let i = 0; i < items.length; i++) {
            const resource = this.getNodeParameter("resource", i);
            const operation = this.getNodeParameter("operation", i);
            try {
                let responseData;
                if (resource === "pipeline") {
                    responseData = await pipeline.execute(this, i, operation, baseUrl, headers);
                }
                else if (resource === "user") {
                    responseData = await user.execute(this, i, operation, baseUrl, headers);
                }
                else if (resource === "card") {
                    responseData = await card.execute(this, i, operation, baseUrl, headers, headersJson);
                }
                else if (resource === "cardComment") {
                    responseData = await cardComment.execute(this, i, operation, baseUrl, headers, headersJson);
                }
                else if (resource === "cardTask") {
                    responseData = await cardTask.execute(this, i, operation, baseUrl, headers, headersJson);
                }
                else if (resource === "contact") {
                    responseData = await contact.execute(this, i, operation, baseUrl, headers, headersJson);
                }
                else if (resource === "company") {
                    responseData = await company.execute(this, i, operation, baseUrl, headers, headersJson);
                }
                else if (resource === "cardTag") {
                    responseData = await cardTag.execute(this, i, operation, baseUrl, headers, headersJson);
                }
                else {
                    throw new Error(`Recurso desconhecido: ${resource}`);
                }
                // Rotas de listagem do CRM devolvem array: cada elemento vira um item.
                if (Array.isArray(responseData)) {
                    for (const entry of responseData) {
                        returnData.push({ json: entry, pairedItem: { item: i } });
                    }
                }
                else {
                    returnData.push({ json: responseData !== null && responseData !== void 0 ? responseData : {}, pairedItem: { item: i } });
                }
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
exports.ChatlabsCrm = ChatlabsCrm;
//# sourceMappingURL=ChatlabsCrm.node.js.map