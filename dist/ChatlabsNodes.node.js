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
                        {
                            name: "Listar Clientes",
                            value: "listClients",
                            description: "Lista os clientes da plataforma",
                            action: "Listar clientes",
                        },
                        {
                            name: "Obter Cliente",
                            value: "getClient",
                            description: "Obtém um cliente pelo ID",
                            action: "Obter cliente",
                        },
                        {
                            name: "Criar Cliente",
                            value: "createClient",
                            description: "Cria um novo cliente na plataforma",
                            action: "Criar cliente",
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
                // === createClient ===
                {
                    displayName: "Nome",
                    name: "createClientName",
                    type: "string",
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ["createClient"],
                        },
                    },
                    default: "",
                    description: "Nome do cliente",
                },
                {
                    displayName: "Telefones",
                    name: "createClientPhones",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["createClient"],
                        },
                    },
                    default: "",
                    description: "Telefones separados por vírgula (ex: +55 53 99999-9999, +55 11 98888-7777)",
                },
                {
                    displayName: "E-mail",
                    name: "createClientEmail",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["createClient"],
                        },
                    },
                    default: "",
                    description: "E-mail do cliente (opcional)",
                },
                {
                    displayName: "Identificação",
                    name: "createClientIdentification",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["createClient"],
                        },
                    },
                    default: "",
                    description: "CPF/CNPJ ou outro identificador (opcional)",
                },
                {
                    displayName: "Data de Nascimento",
                    name: "createClientBirthday",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["createClient"],
                        },
                    },
                    default: "",
                    placeholder: "DD/MM/AAAA",
                    description: "Data de nascimento no formato DD/MM/AAAA (opcional)",
                },
                {
                    displayName: "Tags",
                    name: "createClientTags",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["createClient"],
                        },
                    },
                    default: "",
                    description: "Tags separadas por vírgula (opcional)",
                },
                // === getClient ===
                {
                    displayName: "ID do Cliente",
                    name: "clientId",
                    type: "string",
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ["getClient"],
                        },
                    },
                    default: "",
                    description: "ID do cliente a ser obtido",
                },
                // === listClients ===
                {
                    displayName: "Por Página",
                    name: "clientPerPage",
                    type: "number",
                    displayOptions: {
                        show: {
                            operation: ["listClients"],
                        },
                    },
                    typeOptions: { minValue: 1, maxValue: 100 },
                    default: 10,
                    description: "Número de clientes por página",
                },
                {
                    displayName: "Campo de Pesquisa",
                    name: "clientField",
                    type: "options",
                    displayOptions: {
                        show: {
                            operation: ["listClients"],
                        },
                    },
                    options: [
                        { name: "Nenhum", value: "" },
                        { name: "Nome", value: "NAME" },
                        { name: "E-mail", value: "EMAIL" },
                        { name: "Identificação", value: "IDENTIFICATION" },
                        { name: "Telefone", value: "PHONE" },
                        { name: "Tags", value: "TAGS" },
                    ],
                    default: "",
                    description: "Campo para filtrar os clientes (opcional)",
                },
                {
                    displayName: "Valor da Pesquisa",
                    name: "clientSearchValue",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["listClients"],
                            clientField: ["NAME", "EMAIL", "IDENTIFICATION", "PHONE", "TAGS"],
                        },
                    },
                    default: "",
                    description: "Valor a ser pesquisado no campo selecionado",
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
                if (operation === "createClient") {
                    const name = this.getNodeParameter("createClientName", i);
                    const email = this.getNodeParameter("createClientEmail", i);
                    const identification = this.getNodeParameter("createClientIdentification", i);
                    const birthday = this.getNodeParameter("createClientBirthday", i);
                    const phonesRaw = this.getNodeParameter("createClientPhones", i);
                    const tagsRaw = this.getNodeParameter("createClientTags", i);
                    const phones = phonesRaw
                        ? phonesRaw.split(",").map((p) => p.trim()).filter(Boolean)
                        : [];
                    const tags = tagsRaw
                        ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
                        : [];
                    const body = { name, phones, tags };
                    if (email)
                        body.email = email;
                    if (identification)
                        body.identification = identification;
                    if (birthday)
                        body.birthday = birthday;
                    const response = await this.helpers.httpRequest({
                        method: "POST",
                        url: `${baseUrl}/api/client`,
                        headers: { ...headers, "Content-Type": "application/json" },
                        body,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "getClient") {
                    const clientId = this.getNodeParameter("clientId", i);
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/client/${clientId}`,
                        headers,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "listClients") {
                    const perPage = this.getNodeParameter("clientPerPage", i);
                    const field = this.getNodeParameter("clientField", i);
                    const searchValue = field
                        ? this.getNodeParameter("clientSearchValue", i)
                        : "";
                    const qs = { perPage };
                    if (field && searchValue) {
                        qs.field = field;
                        qs.value = searchValue;
                    }
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/client`,
                        headers,
                        qs,
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