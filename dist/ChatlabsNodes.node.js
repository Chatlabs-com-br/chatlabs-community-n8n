"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatlabsNodes = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class ChatlabsNodes {
    constructor() {
        this.description = {
            displayName: "Chatlabs",
            name: "chatlabsNodes",
            icon: "file:chatlabs.png",
            group: ["output"],
            version: 1,
            subtitle: '={{$parameter["operation"]}}',
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
                    displayName: "Operação",
                    name: "operation",
                    type: "options",
                    noDataExpression: true,
                    options: [
                        {
                            name: "Listar Atendentes",
                            value: "listAttendants",
                            description: "Lista os atendentes da plataforma",
                            action: "Listar atendentes",
                        },
                        {
                            name: "Obter Atendente",
                            value: "getAttendant",
                            description: "Obtém um atendente pelo ID",
                            action: "Obter atendente",
                        },
                    ],
                    default: "listAttendants",
                },
                // === listAttendants ===
                {
                    displayName: "Por Página",
                    name: "perPage",
                    type: "number",
                    displayOptions: {
                        show: {
                            operation: ["listAttendants"],
                        },
                    },
                    typeOptions: { minValue: 1, maxValue: 100 },
                    default: 10,
                    description: "Número de atendentes por página",
                },
                // === getAttendant ===
                {
                    displayName: "ID do Atendente",
                    name: "attendantId",
                    type: "string",
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ["getAttendant"],
                        },
                    },
                    default: "",
                    description: "ID do atendente a ser obtido",
                },
                {
                    displayName: "Campo de Pesquisa",
                    name: "field",
                    type: "options",
                    displayOptions: {
                        show: {
                            operation: ["listAttendants"],
                        },
                    },
                    options: [
                        { name: "Nenhum", value: "" },
                        { name: "Nome Completo", value: "FULLNAME" },
                        { name: "E-mail", value: "EMAIL" },
                    ],
                    default: "",
                    description: "Campo para filtrar os atendentes (opcional)",
                },
                {
                    displayName: "Valor da Pesquisa",
                    name: "searchValue",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["listAttendants"],
                            field: ["FULLNAME", "EMAIL"],
                        },
                    },
                    default: "",
                    description: "Valor a ser pesquisado no campo selecionado",
                },
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
        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter("operation", i);
            try {
                let responseData = {};
                if (operation === "listAttendants") {
                    const perPage = this.getNodeParameter("perPage", i);
                    const field = this.getNodeParameter("field", i);
                    const searchValue = field
                        ? this.getNodeParameter("searchValue", i)
                        : "";
                    const qs = { perPage };
                    if (field && searchValue) {
                        qs.field = field;
                        qs.value = searchValue;
                    }
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/attendant`,
                        headers,
                        qs,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "getAttendant") {
                    const attendantId = this.getNodeParameter("attendantId", i);
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/attendant/${attendantId}`,
                        headers,
                        json: true,
                    });
                    responseData = response;
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