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
                        {
                            name: "Atualizar Cliente",
                            value: "updateClient",
                            description: "Atualiza os dados de um cliente",
                            action: "Atualizar cliente",
                        },
                        {
                            name: "Deletar Cliente",
                            value: "deleteClient",
                            description: "Remove um cliente da plataforma",
                            action: "Deletar cliente",
                        },
                        {
                            name: "Listar Etiquetas",
                            value: "listTags",
                            description: "Lista as etiquetas da plataforma",
                            action: "Listar etiquetas",
                        },
                        {
                            name: "Obter Etiqueta",
                            value: "getTag",
                            description: "Obtém uma etiqueta pelo ID",
                            action: "Obter etiqueta",
                        },
                        {
                            name: "Criar Etiqueta",
                            value: "createTag",
                            description: "Cria uma nova etiqueta",
                            action: "Criar etiqueta",
                        },
                        {
                            name: "Atualizar Etiqueta",
                            value: "updateTag",
                            description: "Atualiza os dados de uma etiqueta",
                            action: "Atualizar etiqueta",
                        },
                        {
                            name: "Deletar Etiqueta",
                            value: "deleteTag",
                            description: "Remove uma etiqueta da plataforma",
                            action: "Deletar etiqueta",
                        },
                        {
                            name: "Listar Canais",
                            value: "listChannels",
                            description: "Lista todos os canais conectados da empresa (WhatsApp, Facebook, Instagram etc)",
                            action: "Listar canais",
                        },
                        {
                            name: "Listar Chats",
                            value: "listChats",
                            description: "Lista os chats da plataforma com filtros",
                            action: "Listar chats",
                        },
                        {
                            name: "Obter Chat",
                            value: "getChat",
                            description: "Obtém um chat pelo ID",
                            action: "Obter chat",
                        },
                        {
                            name: "Listar Mensagens do Chat",
                            value: "listChatMessages",
                            description: "Lista as mensagens de um chat",
                            action: "Listar mensagens do chat",
                        },
                        {
                            name: "Obter URL de Arquivo de Mensagem",
                            value: "getChatMessageFile",
                            description: "Obtém a URL do arquivo de uma mensagem",
                            action: "Obter URL de arquivo de mensagem",
                        },
                        {
                            name: "Listar Setores",
                            value: "listDepartments",
                            description: "Lista os setores da empresa",
                            action: "Listar setores",
                        },
                        {
                            name: "Obter Setor",
                            value: "getDepartment",
                            description: "Obtém um setor pelo ID",
                            action: "Obter setor",
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
                // === getDepartment ===
                {
                    displayName: "ID do Setor",
                    name: "getDepartmentId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { operation: ["getDepartment"] } },
                    default: "",
                    description: "ID do setor a ser obtido",
                },
                // === listDepartments ===
                {
                    displayName: "Por Página",
                    name: "deptPerPage",
                    type: "number",
                    displayOptions: { show: { operation: ["listDepartments"] } },
                    typeOptions: { minValue: 1, maxValue: 100 },
                    default: 10,
                    description: "Número de setores por página",
                },
                {
                    displayName: "Cursor",
                    name: "deptCursor",
                    type: "string",
                    displayOptions: { show: { operation: ["listDepartments"] } },
                    default: "",
                    description: "Cursor de paginação (opcional)",
                },
                {
                    displayName: "Campo de Pesquisa",
                    name: "deptField",
                    type: "options",
                    displayOptions: { show: { operation: ["listDepartments"] } },
                    options: [
                        { name: "Nenhum", value: "" },
                        { name: "Nome", value: "NAME" },
                    ],
                    default: "",
                    description: "Campo para filtrar os setores (opcional)",
                },
                {
                    displayName: "Valor da Pesquisa",
                    name: "deptValue",
                    type: "string",
                    displayOptions: { show: { operation: ["listDepartments"], deptField: ["NAME"] } },
                    default: "",
                    description: "Valor a ser pesquisado no campo selecionado",
                },
                // === getChatMessageFile ===
                {
                    displayName: "ID da Mensagem",
                    name: "messageFileId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { operation: ["getChatMessageFile"] } },
                    default: "",
                    description: "ID da mensagem para obter a URL do arquivo",
                },
                // === listChatMessages ===
                {
                    displayName: "ID do Chat",
                    name: "chatMessagesId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { operation: ["listChatMessages"] } },
                    default: "",
                    description: "ID do chat para buscar as mensagens",
                },
                {
                    displayName: "Por Página",
                    name: "chatMessagesPerPage",
                    type: "number",
                    displayOptions: { show: { operation: ["listChatMessages"] } },
                    typeOptions: { minValue: 1, maxValue: 100 },
                    default: 10,
                    description: "Número de mensagens por página",
                },
                {
                    displayName: "Cursor",
                    name: "chatMessagesCursor",
                    type: "string",
                    displayOptions: { show: { operation: ["listChatMessages"] } },
                    default: "",
                    description: "Cursor de paginação (opcional)",
                },
                // === getChat ===
                {
                    displayName: "ID do Chat",
                    name: "getChatId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { operation: ["getChat"] } },
                    default: "",
                    description: "ID do chat a ser obtido",
                },
                // === listChats ===
                {
                    displayName: "Por Página",
                    name: "chatPerPage",
                    type: "number",
                    displayOptions: { show: { operation: ["listChats"] } },
                    typeOptions: { minValue: 1, maxValue: 100 },
                    default: 10,
                    description: "Número de chats por página",
                },
                {
                    displayName: "Cursor",
                    name: "chatCursor",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Cursor de paginação (opcional)",
                },
                {
                    displayName: "Status (Step)",
                    name: "chatStep",
                    type: "multiOptions",
                    displayOptions: { show: { operation: ["listChats"] } },
                    options: [
                        { name: "Bot", value: "BOT" },
                        { name: "Pendente", value: "PENDING" },
                        { name: "Ativo", value: "ACTIVE" },
                        { name: "Concluído", value: "CONCLUDED" },
                    ],
                    default: [],
                    description: "Filtrar por status do chat (opcional)",
                },
                {
                    displayName: "Nome do Cliente",
                    name: "chatClientName",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Filtrar por nome do cliente (opcional)",
                },
                {
                    displayName: "Telefone do Cliente",
                    name: "chatClientPhone",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Filtrar por telefone do cliente (opcional)",
                },
                {
                    displayName: "Protocolo",
                    name: "chatProtocol",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Filtrar por protocolo (opcional)",
                },
                {
                    displayName: "ID do Atendente",
                    name: "chatAttendantId",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Filtrar por ID do atendente (opcional)",
                },
                {
                    displayName: "Nome do Atendente",
                    name: "chatAttendantName",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Filtrar por nome do atendente (opcional)",
                },
                {
                    displayName: "E-mail do Atendente",
                    name: "chatAttendantEmail",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Filtrar por e-mail do atendente (opcional)",
                },
                {
                    displayName: "Criado a Partir de",
                    name: "chatCreatedAtStart",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    placeholder: "2026-01-01T00:00:00Z",
                    description: "Data de início de criação (opcional)",
                },
                {
                    displayName: "Criado Até",
                    name: "chatCreatedAtEnd",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    placeholder: "2026-12-31T23:59:59Z",
                    description: "Data de fim de criação (opcional)",
                },
                {
                    displayName: "Fechado a Partir de",
                    name: "chatClosedAtStart",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Data de início de fechamento (opcional)",
                },
                {
                    displayName: "Fechado Até",
                    name: "chatClosedAtEnd",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Data de fim de fechamento (opcional)",
                },
                {
                    displayName: "Valor Última Mensagem",
                    name: "chatLastMessageAtValue",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Data para filtro de última mensagem (opcional)",
                },
                {
                    displayName: "Filtro Última Mensagem",
                    name: "chatLastMessageAtFilter",
                    type: "options",
                    displayOptions: { show: { operation: ["listChats"] } },
                    options: [
                        { name: "Nenhum", value: "" },
                        { name: "Menor que", value: "LESS_THAN" },
                        { name: "Maior que", value: "GREATER_THAN" },
                        { name: "Igual", value: "EQUAL" },
                        { name: "Menor ou igual", value: "LESS_EQUAL" },
                        { name: "Maior ou igual", value: "GREATER_EQUAL" },
                    ],
                    default: "",
                    description: "Operador para filtro de última mensagem (opcional)",
                },
                {
                    displayName: "Valor Última Mensagem do Cliente",
                    name: "chatLastClientMessageAtValue",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Data para filtro de última mensagem do cliente (opcional)",
                },
                {
                    displayName: "Filtro Última Mensagem do Cliente",
                    name: "chatLastClientMessageAtFilter",
                    type: "options",
                    displayOptions: { show: { operation: ["listChats"] } },
                    options: [
                        { name: "Nenhum", value: "" },
                        { name: "Menor que", value: "LESS_THAN" },
                        { name: "Maior que", value: "GREATER_THAN" },
                        { name: "Igual", value: "EQUAL" },
                        { name: "Menor ou igual", value: "LESS_EQUAL" },
                        { name: "Maior ou igual", value: "GREATER_EQUAL" },
                    ],
                    default: "",
                    description: "Operador para filtro de última mensagem do cliente (opcional)",
                },
                {
                    displayName: "Valor Última Mensagem do Admin",
                    name: "chatLastAdminMessageAtValue",
                    type: "string",
                    displayOptions: { show: { operation: ["listChats"] } },
                    default: "",
                    description: "Data para filtro de última mensagem do admin (opcional)",
                },
                {
                    displayName: "Filtro Última Mensagem do Admin",
                    name: "chatLastAdminMessageAtFilter",
                    type: "options",
                    displayOptions: { show: { operation: ["listChats"] } },
                    options: [
                        { name: "Nenhum", value: "" },
                        { name: "Menor que", value: "LESS_THAN" },
                        { name: "Maior que", value: "GREATER_THAN" },
                        { name: "Igual", value: "EQUAL" },
                        { name: "Menor ou igual", value: "LESS_EQUAL" },
                        { name: "Maior ou igual", value: "GREATER_EQUAL" },
                    ],
                    default: "",
                    description: "Operador para filtro de última mensagem do admin (opcional)",
                },
                // === listTags ===
                {
                    displayName: "Por Página",
                    name: "tagPerPage",
                    type: "number",
                    displayOptions: { show: { operation: ["listTags"] } },
                    typeOptions: { minValue: 1, maxValue: 100 },
                    default: 10,
                    description: "Número de etiquetas por página",
                },
                {
                    displayName: "Cursor",
                    name: "tagCursor",
                    type: "string",
                    displayOptions: { show: { operation: ["listTags"] } },
                    default: "",
                    description: "Cursor de paginação (opcional)",
                },
                // === getTag ===
                {
                    displayName: "ID da Etiqueta",
                    name: "getTagId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { operation: ["getTag"] } },
                    default: "",
                    description: "ID da etiqueta a ser obtida",
                },
                // === createTag ===
                {
                    displayName: "Nome",
                    name: "createTagName",
                    type: "string",
                    required: true,
                    displayOptions: { show: { operation: ["createTag"] } },
                    default: "",
                    description: "Nome da etiqueta",
                },
                {
                    displayName: "Cor",
                    name: "createTagColor",
                    type: "color",
                    displayOptions: { show: { operation: ["createTag"] } },
                    default: "#ffffff",
                    description: "Cor da etiqueta",
                },
                {
                    displayName: "Nome Completo",
                    name: "createTagFullname",
                    type: "string",
                    displayOptions: { show: { operation: ["createTag"] } },
                    default: "",
                    description: "Nome completo da etiqueta (opcional)",
                },
                {
                    displayName: "Código",
                    name: "createTagCode",
                    type: "string",
                    displayOptions: { show: { operation: ["createTag"] } },
                    default: "",
                    description: "Código da etiqueta (opcional)",
                },
                // === updateTag ===
                {
                    displayName: "ID da Etiqueta",
                    name: "updateTagId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { operation: ["updateTag"] } },
                    default: "",
                    description: "ID da etiqueta a ser atualizada",
                },
                {
                    displayName: "Nome",
                    name: "updateTagName",
                    type: "string",
                    displayOptions: { show: { operation: ["updateTag"] } },
                    default: "",
                    description: "Nome da etiqueta (opcional)",
                },
                {
                    displayName: "Cor",
                    name: "updateTagColor",
                    type: "color",
                    displayOptions: { show: { operation: ["updateTag"] } },
                    default: "#ffffff",
                    description: "Cor da etiqueta (opcional)",
                },
                {
                    displayName: "Nome Completo",
                    name: "updateTagFullname",
                    type: "string",
                    displayOptions: { show: { operation: ["updateTag"] } },
                    default: "",
                    description: "Nome completo da etiqueta (opcional)",
                },
                {
                    displayName: "Código",
                    name: "updateTagCode",
                    type: "string",
                    displayOptions: { show: { operation: ["updateTag"] } },
                    default: "",
                    description: "Código da etiqueta (opcional)",
                },
                // === deleteTag ===
                {
                    displayName: "ID da Etiqueta",
                    name: "deleteTagId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { operation: ["deleteTag"] } },
                    default: "",
                    description: "ID da etiqueta a ser deletada",
                },
                // === updateClient ===
                {
                    displayName: "ID do Cliente",
                    name: "updateClientId",
                    type: "string",
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ["updateClient"],
                        },
                    },
                    default: "",
                    description: "ID do cliente a ser atualizado",
                },
                {
                    displayName: "Nome",
                    name: "updateClientName",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["updateClient"],
                        },
                    },
                    default: "",
                    description: "Nome do cliente (opcional)",
                },
                {
                    displayName: "Telefones",
                    name: "updateClientPhones",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["updateClient"],
                        },
                    },
                    default: "",
                    description: "Telefones separados por vírgula (opcional)",
                },
                {
                    displayName: "E-mail",
                    name: "updateClientEmail",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["updateClient"],
                        },
                    },
                    default: "",
                    description: "E-mail do cliente (opcional)",
                },
                {
                    displayName: "Identificação",
                    name: "updateClientIdentification",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["updateClient"],
                        },
                    },
                    default: "",
                    description: "CPF/CNPJ ou outro identificador (opcional)",
                },
                {
                    displayName: "Data de Nascimento",
                    name: "updateClientBirthday",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["updateClient"],
                        },
                    },
                    default: "",
                    placeholder: "DD/MM/AAAA",
                    description: "Data de nascimento no formato DD/MM/AAAA (opcional)",
                },
                {
                    displayName: "Tags",
                    name: "updateClientTags",
                    type: "string",
                    displayOptions: {
                        show: {
                            operation: ["updateClient"],
                        },
                    },
                    default: "",
                    description: "Tags separadas por vírgula (opcional)",
                },
                // === deleteClient ===
                {
                    displayName: "ID do Cliente",
                    name: "deleteClientId",
                    type: "string",
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ["deleteClient"],
                        },
                    },
                    default: "",
                    description: "ID do cliente a ser deletado",
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
                if (operation === "getDepartment") {
                    const deptId = this.getNodeParameter("getDepartmentId", i);
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/department/${deptId}`,
                        headers,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "listDepartments") {
                    const perPage = this.getNodeParameter("deptPerPage", i);
                    const cursor = this.getNodeParameter("deptCursor", i);
                    const field = this.getNodeParameter("deptField", i);
                    const value = field ? this.getNodeParameter("deptValue", i) : "";
                    const qs = { perPage };
                    if (cursor)
                        qs.cursor = cursor;
                    if (field && value) {
                        qs.field = field;
                        qs.value = value;
                    }
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/department`,
                        headers,
                        qs,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "getChatMessageFile") {
                    const messageId = this.getNodeParameter("messageFileId", i);
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/chat/message/${messageId}/file`,
                        headers,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "listChatMessages") {
                    const chatId = this.getNodeParameter("chatMessagesId", i);
                    const perPage = this.getNodeParameter("chatMessagesPerPage", i);
                    const cursor = this.getNodeParameter("chatMessagesCursor", i);
                    const qs = { perPage };
                    if (cursor)
                        qs.cursor = cursor;
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/chat/${chatId}/messages`,
                        headers,
                        qs,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "getChat") {
                    const chatId = this.getNodeParameter("getChatId", i);
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/chat/${chatId}`,
                        headers,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "listChats") {
                    const perPage = this.getNodeParameter("chatPerPage", i);
                    const qs = { perPage };
                    const strFields = [
                        ["chatCursor", "cursor"],
                        ["chatClientName", "clientName"],
                        ["chatClientPhone", "clientPhone"],
                        ["chatProtocol", "protocol"],
                        ["chatAttendantId", "attendantId"],
                        ["chatAttendantName", "attendantName"],
                        ["chatAttendantEmail", "attendantEmail"],
                        ["chatCreatedAtStart", "createdAtStart"],
                        ["chatCreatedAtEnd", "createdAtEnd"],
                        ["chatClosedAtStart", "closedAtStart"],
                        ["chatClosedAtEnd", "closedAtEnd"],
                        ["chatLastMessageAtValue", "lastMessageAtValue"],
                        ["chatLastMessageAtFilter", "lastMessageAtFilter"],
                        ["chatLastClientMessageAtValue", "lastClientMessageAtValue"],
                        ["chatLastClientMessageAtFilter", "lastClientMessageAtFilter"],
                        ["chatLastAdminMessageAtValue", "lastAdminMessageAtValue"],
                        ["chatLastAdminMessageAtFilter", "lastAdminMessageAtFilter"],
                    ];
                    for (const [param, key] of strFields) {
                        const val = this.getNodeParameter(param, i);
                        if (val)
                            qs[key] = val;
                    }
                    const steps = this.getNodeParameter("chatStep", i);
                    if (steps && steps.length > 0)
                        qs.step = steps.join(",");
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/chat`,
                        headers,
                        qs,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "listChannels") {
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/channel`,
                        headers,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "listTags") {
                    const perPage = this.getNodeParameter("tagPerPage", i);
                    const cursor = this.getNodeParameter("tagCursor", i);
                    const qs = { perPage };
                    if (cursor)
                        qs.cursor = cursor;
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/client-tag`,
                        headers,
                        qs,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "getTag") {
                    const tagId = this.getNodeParameter("getTagId", i);
                    const response = await this.helpers.httpRequest({
                        method: "GET",
                        url: `${baseUrl}/api/client-tag/${tagId}`,
                        headers,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "createTag") {
                    const name = this.getNodeParameter("createTagName", i);
                    const color = this.getNodeParameter("createTagColor", i);
                    const fullname = this.getNodeParameter("createTagFullname", i);
                    const code = this.getNodeParameter("createTagCode", i);
                    const body = { name, color };
                    if (fullname)
                        body.fullname = fullname;
                    if (code)
                        body.code = code;
                    const response = await this.helpers.httpRequest({
                        method: "POST",
                        url: `${baseUrl}/api/client-tag`,
                        headers: { ...headers, "Content-Type": "application/json" },
                        body,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "updateTag") {
                    const tagId = this.getNodeParameter("updateTagId", i);
                    const name = this.getNodeParameter("updateTagName", i);
                    const color = this.getNodeParameter("updateTagColor", i);
                    const fullname = this.getNodeParameter("updateTagFullname", i);
                    const code = this.getNodeParameter("updateTagCode", i);
                    const body = {};
                    if (name)
                        body.name = name;
                    if (color)
                        body.color = color;
                    if (fullname)
                        body.fullname = fullname;
                    if (code)
                        body.code = code;
                    const response = await this.helpers.httpRequest({
                        method: "PATCH",
                        url: `${baseUrl}/api/client-tag/${tagId}`,
                        headers: { ...headers, "Content-Type": "application/json" },
                        body,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "deleteTag") {
                    const tagId = this.getNodeParameter("deleteTagId", i);
                    const response = await this.helpers.httpRequest({
                        method: "DELETE",
                        url: `${baseUrl}/api/client-tag/${tagId}`,
                        headers,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "updateClient") {
                    const clientId = this.getNodeParameter("updateClientId", i);
                    const name = this.getNodeParameter("updateClientName", i);
                    const email = this.getNodeParameter("updateClientEmail", i);
                    const identification = this.getNodeParameter("updateClientIdentification", i);
                    const birthday = this.getNodeParameter("updateClientBirthday", i);
                    const phonesRaw = this.getNodeParameter("updateClientPhones", i);
                    const tagsRaw = this.getNodeParameter("updateClientTags", i);
                    const body = {};
                    if (name)
                        body.name = name;
                    if (email)
                        body.email = email;
                    if (identification)
                        body.identification = identification;
                    if (birthday)
                        body.birthday = birthday;
                    if (phonesRaw)
                        body.phones = phonesRaw.split(",").map((p) => p.trim()).filter(Boolean);
                    if (tagsRaw)
                        body.tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
                    const response = await this.helpers.httpRequest({
                        method: "PUT",
                        url: `${baseUrl}/api/client/${clientId}`,
                        headers: { ...headers, "Content-Type": "application/json" },
                        body,
                        json: true,
                    });
                    responseData = response;
                }
                if (operation === "deleteClient") {
                    const clientId = this.getNodeParameter("deleteClientId", i);
                    const response = await this.helpers.httpRequest({
                        method: "DELETE",
                        url: `${baseUrl}/api/client/${clientId}`,
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