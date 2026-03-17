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
                // ─── RECURSO ───────────────────────────────────────────────────────────
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
                // ─── OPERAÇÕES: ATENDENTE ───────────────────────────────────────────────
                {
                    displayName: "Operação",
                    name: "operation",
                    type: "options",
                    noDataExpression: true,
                    displayOptions: { show: { resource: ["attendant"] } },
                    options: [
                        { name: "Listar", value: "list", action: "Listar atendentes" },
                        { name: "Obter", value: "get", action: "Obter atendente por ID" },
                    ],
                    default: "list",
                },
                // ─── OPERAÇÕES: CANAL ──────────────────────────────────────────────────
                {
                    displayName: "Operação",
                    name: "operation",
                    type: "options",
                    noDataExpression: true,
                    displayOptions: { show: { resource: ["channel"] } },
                    options: [
                        { name: "Listar", value: "list", action: "Listar canais conectados" },
                    ],
                    default: "list",
                },
                // ─── OPERAÇÕES: CHAT ───────────────────────────────────────────────────
                {
                    displayName: "Operação",
                    name: "operation",
                    type: "options",
                    noDataExpression: true,
                    displayOptions: { show: { resource: ["chat"] } },
                    options: [
                        { name: "Listar", value: "list", action: "Listar chats" },
                        { name: "Obter", value: "get", action: "Obter chat por ID" },
                        { name: "Listar Mensagens", value: "listMessages", action: "Listar mensagens do chat" },
                        { name: "Obter Arquivo de Mensagem", value: "getMessageFile", action: "Obter URL do arquivo de mensagem" },
                        { name: "Enviar Mensagem", value: "sendMessage", action: "Enviar mensagem de texto" },
                    ],
                    default: "list",
                },
                // ─── OPERAÇÕES: CLIENTE ────────────────────────────────────────────────
                {
                    displayName: "Operação",
                    name: "operation",
                    type: "options",
                    noDataExpression: true,
                    displayOptions: { show: { resource: ["client"] } },
                    options: [
                        { name: "Listar", value: "list", action: "Listar clientes" },
                        { name: "Obter", value: "get", action: "Obter cliente por ID" },
                        { name: "Criar", value: "create", action: "Criar cliente" },
                        { name: "Atualizar", value: "update", action: "Atualizar cliente" },
                        { name: "Deletar", value: "delete", action: "Deletar cliente" },
                    ],
                    default: "list",
                },
                // ─── OPERAÇÕES: ETIQUETA ───────────────────────────────────────────────
                {
                    displayName: "Operação",
                    name: "operation",
                    type: "options",
                    noDataExpression: true,
                    displayOptions: { show: { resource: ["tag"] } },
                    options: [
                        { name: "Listar", value: "list", action: "Listar etiquetas" },
                        { name: "Obter", value: "get", action: "Obter etiqueta por ID" },
                        { name: "Criar", value: "create", action: "Criar etiqueta" },
                        { name: "Atualizar", value: "update", action: "Atualizar etiqueta" },
                        { name: "Deletar", value: "delete", action: "Deletar etiqueta" },
                    ],
                    default: "list",
                },
                // ─── OPERAÇÕES: SETOR ──────────────────────────────────────────────────
                {
                    displayName: "Operação",
                    name: "operation",
                    type: "options",
                    noDataExpression: true,
                    displayOptions: { show: { resource: ["department"] } },
                    options: [
                        { name: "Listar", value: "list", action: "Listar setores" },
                        { name: "Obter", value: "get", action: "Obter setor por ID" },
                    ],
                    default: "list",
                },
                // ═══════════════════════════════════════════════════════════════════════
                // CAMPOS: ATENDENTE
                // ═══════════════════════════════════════════════════════════════════════
                {
                    displayName: "Por Página",
                    name: "perPage",
                    type: "number",
                    displayOptions: { show: { resource: ["attendant"], operation: ["list"] } },
                    typeOptions: { minValue: 1, maxValue: 100 },
                    default: 10,
                    description: "Número de atendentes por página",
                },
                {
                    displayName: "Campo de Pesquisa",
                    name: "field",
                    type: "options",
                    displayOptions: { show: { resource: ["attendant"], operation: ["list"] } },
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
                    displayOptions: { show: { resource: ["attendant"], operation: ["list"], field: ["FULLNAME", "EMAIL"] } },
                    default: "",
                    description: "Valor a ser pesquisado",
                },
                {
                    displayName: "ID do Atendente",
                    name: "attendantId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { resource: ["attendant"], operation: ["get"] } },
                    default: "",
                    description: "ID do atendente",
                },
                // ═══════════════════════════════════════════════════════════════════════
                // CAMPOS: CHAT
                // ═══════════════════════════════════════════════════════════════════════
                {
                    displayName: "ID do Chat",
                    name: "chatId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { resource: ["chat"], operation: ["get", "listMessages"] } },
                    default: "",
                    description: "ID do chat",
                },
                {
                    displayName: "Por Página",
                    name: "perPage",
                    type: "number",
                    displayOptions: { show: { resource: ["chat"], operation: ["list", "listMessages"] } },
                    typeOptions: { minValue: 1, maxValue: 100 },
                    default: 10,
                    description: "Número de itens por página",
                },
                {
                    displayName: "Cursor",
                    name: "cursor",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["list", "listMessages"] } },
                    default: "",
                    description: "Cursor de paginação (opcional)",
                },
                {
                    displayName: "Status",
                    name: "chatStep",
                    type: "multiOptions",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
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
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    description: "Filtrar por nome do cliente (opcional)",
                },
                {
                    displayName: "Telefone do Cliente",
                    name: "chatClientPhone",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    description: "Filtrar por telefone do cliente (opcional)",
                },
                {
                    displayName: "Protocolo",
                    name: "chatProtocol",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    description: "Filtrar por protocolo (opcional)",
                },
                {
                    displayName: "ID do Atendente",
                    name: "chatAttendantId",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    description: "Filtrar por ID do atendente (opcional)",
                },
                {
                    displayName: "Nome do Atendente",
                    name: "chatAttendantName",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    description: "Filtrar por nome do atendente (opcional)",
                },
                {
                    displayName: "E-mail do Atendente",
                    name: "chatAttendantEmail",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    description: "Filtrar por e-mail do atendente (opcional)",
                },
                {
                    displayName: "Criado a Partir de",
                    name: "chatCreatedAtStart",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    placeholder: "2026-01-01T00:00:00Z",
                    description: "Data de início de criação (opcional)",
                },
                {
                    displayName: "Criado Até",
                    name: "chatCreatedAtEnd",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    placeholder: "2026-12-31T23:59:59Z",
                    description: "Data de fim de criação (opcional)",
                },
                {
                    displayName: "Fechado a Partir de",
                    name: "chatClosedAtStart",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    description: "Data de início de fechamento (opcional)",
                },
                {
                    displayName: "Fechado Até",
                    name: "chatClosedAtEnd",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    description: "Data de fim de fechamento (opcional)",
                },
                {
                    displayName: "Valor Última Mensagem",
                    name: "chatLastMessageAtValue",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    description: "Data para filtro de última mensagem (opcional)",
                },
                {
                    displayName: "Filtro Última Mensagem",
                    name: "chatLastMessageAtFilter",
                    type: "options",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
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
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    description: "Data para filtro de última mensagem do cliente (opcional)",
                },
                {
                    displayName: "Filtro Última Mensagem do Cliente",
                    name: "chatLastClientMessageAtFilter",
                    type: "options",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
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
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
                    default: "",
                    description: "Data para filtro de última mensagem do admin (opcional)",
                },
                {
                    displayName: "Filtro Última Mensagem do Admin",
                    name: "chatLastAdminMessageAtFilter",
                    type: "options",
                    displayOptions: { show: { resource: ["chat"], operation: ["list"] } },
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
                {
                    displayName: "ID da Mensagem",
                    name: "messageId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { resource: ["chat"], operation: ["getMessageFile"] } },
                    default: "",
                    description: "ID da mensagem para obter a URL do arquivo",
                },
                {
                    displayName: "ID do Chat",
                    name: "sendMessageChatId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { resource: ["chat"], operation: ["sendMessage"] } },
                    default: "",
                    description: "ID do chat para enviar a mensagem",
                },
                {
                    displayName: "Texto",
                    name: "sendMessageText",
                    type: "string",
                    required: true,
                    typeOptions: { rows: 4 },
                    displayOptions: { show: { resource: ["chat"], operation: ["sendMessage"] } },
                    default: "",
                    description: "Texto da mensagem",
                },
                {
                    displayName: "ID do Atendente",
                    name: "sendMessageAttendantId",
                    type: "string",
                    displayOptions: { show: { resource: ["chat"], operation: ["sendMessage"] } },
                    default: "",
                    description: "ID do atendente que está enviando a mensagem (opcional)",
                },
                // ═══════════════════════════════════════════════════════════════════════
                // CAMPOS: CLIENTE
                // ═══════════════════════════════════════════════════════════════════════
                {
                    displayName: "Por Página",
                    name: "perPage",
                    type: "number",
                    displayOptions: { show: { resource: ["client"], operation: ["list"] } },
                    typeOptions: { minValue: 1, maxValue: 100 },
                    default: 10,
                    description: "Número de clientes por página",
                },
                {
                    displayName: "Campo de Pesquisa",
                    name: "clientField",
                    type: "options",
                    displayOptions: { show: { resource: ["client"], operation: ["list"] } },
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
                    displayOptions: { show: { resource: ["client"], operation: ["list"], clientField: ["NAME", "EMAIL", "IDENTIFICATION", "PHONE", "TAGS"] } },
                    default: "",
                    description: "Valor a ser pesquisado",
                },
                {
                    displayName: "ID do Cliente",
                    name: "clientId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { resource: ["client"], operation: ["get", "update", "delete"] } },
                    default: "",
                    description: "ID do cliente",
                },
                {
                    displayName: "Nome",
                    name: "clientName",
                    type: "string",
                    required: true,
                    displayOptions: { show: { resource: ["client"], operation: ["create"] } },
                    default: "",
                    description: "Nome do cliente",
                },
                {
                    displayName: "Nome",
                    name: "clientName",
                    type: "string",
                    displayOptions: { show: { resource: ["client"], operation: ["update"] } },
                    default: "",
                    description: "Nome do cliente (opcional)",
                },
                {
                    displayName: "Telefones",
                    name: "clientPhones",
                    type: "string",
                    displayOptions: { show: { resource: ["client"], operation: ["create", "update"] } },
                    default: "",
                    description: "Telefones separados por vírgula (ex: +55 53 99999-9999, +55 11 98888-7777)",
                },
                {
                    displayName: "E-mail",
                    name: "clientEmail",
                    type: "string",
                    displayOptions: { show: { resource: ["client"], operation: ["create", "update"] } },
                    default: "",
                    description: "E-mail do cliente (opcional)",
                },
                {
                    displayName: "Identificação",
                    name: "clientIdentification",
                    type: "string",
                    displayOptions: { show: { resource: ["client"], operation: ["create", "update"] } },
                    default: "",
                    description: "CPF/CNPJ ou outro identificador (opcional)",
                },
                {
                    displayName: "Data de Nascimento",
                    name: "clientBirthday",
                    type: "string",
                    displayOptions: { show: { resource: ["client"], operation: ["create", "update"] } },
                    default: "",
                    placeholder: "DD/MM/AAAA",
                    description: "Data de nascimento no formato DD/MM/AAAA (opcional)",
                },
                {
                    displayName: "Tags",
                    name: "clientTags",
                    type: "string",
                    displayOptions: { show: { resource: ["client"], operation: ["create", "update"] } },
                    default: "",
                    description: "Tags separadas por vírgula (opcional)",
                },
                // ═══════════════════════════════════════════════════════════════════════
                // CAMPOS: ETIQUETA
                // ═══════════════════════════════════════════════════════════════════════
                {
                    displayName: "Por Página",
                    name: "perPage",
                    type: "number",
                    displayOptions: { show: { resource: ["tag"], operation: ["list"] } },
                    typeOptions: { minValue: 1, maxValue: 100 },
                    default: 10,
                    description: "Número de etiquetas por página",
                },
                {
                    displayName: "Cursor",
                    name: "cursor",
                    type: "string",
                    displayOptions: { show: { resource: ["tag"], operation: ["list"] } },
                    default: "",
                    description: "Cursor de paginação (opcional)",
                },
                {
                    displayName: "ID da Etiqueta",
                    name: "tagId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { resource: ["tag"], operation: ["get", "update", "delete"] } },
                    default: "",
                    description: "ID da etiqueta",
                },
                {
                    displayName: "Nome",
                    name: "tagName",
                    type: "string",
                    required: true,
                    displayOptions: { show: { resource: ["tag"], operation: ["create"] } },
                    default: "",
                    description: "Nome da etiqueta",
                },
                {
                    displayName: "Nome",
                    name: "tagName",
                    type: "string",
                    displayOptions: { show: { resource: ["tag"], operation: ["update"] } },
                    default: "",
                    description: "Nome da etiqueta (opcional)",
                },
                {
                    displayName: "Cor",
                    name: "tagColor",
                    type: "color",
                    displayOptions: { show: { resource: ["tag"], operation: ["create"] } },
                    default: "#ffffff",
                    description: "Cor da etiqueta",
                },
                {
                    displayName: "Cor",
                    name: "tagColor",
                    type: "color",
                    displayOptions: { show: { resource: ["tag"], operation: ["update"] } },
                    default: "#ffffff",
                    description: "Cor da etiqueta (opcional)",
                },
                {
                    displayName: "Nome Completo",
                    name: "tagFullname",
                    type: "string",
                    displayOptions: { show: { resource: ["tag"], operation: ["create", "update"] } },
                    default: "",
                    description: "Nome completo da etiqueta (opcional)",
                },
                {
                    displayName: "Código",
                    name: "tagCode",
                    type: "string",
                    displayOptions: { show: { resource: ["tag"], operation: ["create", "update"] } },
                    default: "",
                    description: "Código da etiqueta (opcional)",
                },
                // ═══════════════════════════════════════════════════════════════════════
                // CAMPOS: SETOR
                // ═══════════════════════════════════════════════════════════════════════
                {
                    displayName: "Por Página",
                    name: "perPage",
                    type: "number",
                    displayOptions: { show: { resource: ["department"], operation: ["list"] } },
                    typeOptions: { minValue: 1, maxValue: 100 },
                    default: 10,
                    description: "Número de setores por página",
                },
                {
                    displayName: "Cursor",
                    name: "cursor",
                    type: "string",
                    displayOptions: { show: { resource: ["department"], operation: ["list"] } },
                    default: "",
                    description: "Cursor de paginação (opcional)",
                },
                {
                    displayName: "Campo de Pesquisa",
                    name: "deptField",
                    type: "options",
                    displayOptions: { show: { resource: ["department"], operation: ["list"] } },
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
                    displayOptions: { show: { resource: ["department"], operation: ["list"], deptField: ["NAME"] } },
                    default: "",
                    description: "Valor a ser pesquisado",
                },
                {
                    displayName: "ID do Setor",
                    name: "departmentId",
                    type: "string",
                    required: true,
                    displayOptions: { show: { resource: ["department"], operation: ["get"] } },
                    default: "",
                    description: "ID do setor",
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
        const headersJson = { ...headers, "Content-Type": "application/json" };
        for (let i = 0; i < items.length; i++) {
            const resource = this.getNodeParameter("resource", i);
            const operation = this.getNodeParameter("operation", i);
            try {
                let responseData = {};
                // ─── ATENDENTE ──────────────────────────────────────────────────────
                if (resource === "attendant") {
                    if (operation === "list") {
                        const perPage = this.getNodeParameter("perPage", i);
                        const field = this.getNodeParameter("field", i);
                        const searchValue = field ? this.getNodeParameter("searchValue", i) : "";
                        const qs = { perPage };
                        if (field && searchValue) {
                            qs.field = field;
                            qs.value = searchValue;
                        }
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/attendant`, headers, qs, json: true });
                    }
                    if (operation === "get") {
                        const id = this.getNodeParameter("attendantId", i);
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/attendant/${id}`, headers, json: true });
                    }
                }
                // ─── CANAL ──────────────────────────────────────────────────────────
                if (resource === "channel") {
                    responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/channel`, headers, json: true });
                }
                // ─── CHAT ───────────────────────────────────────────────────────────
                if (resource === "chat") {
                    if (operation === "list") {
                        const perPage = this.getNodeParameter("perPage", i);
                        const qs = { perPage };
                        const strFields = [
                            ["cursor", "cursor"],
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
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/chat`, headers, qs, json: true });
                    }
                    if (operation === "get") {
                        const id = this.getNodeParameter("chatId", i);
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/chat/${id}`, headers, json: true });
                    }
                    if (operation === "listMessages") {
                        const id = this.getNodeParameter("chatId", i);
                        const perPage = this.getNodeParameter("perPage", i);
                        const cursor = this.getNodeParameter("cursor", i);
                        const qs = { perPage };
                        if (cursor)
                            qs.cursor = cursor;
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/chat/${id}/messages`, headers, qs, json: true });
                    }
                    if (operation === "sendMessage") {
                        const chatId = this.getNodeParameter("sendMessageChatId", i);
                        const text = this.getNodeParameter("sendMessageText", i);
                        const attendantId = this.getNodeParameter("sendMessageAttendantId", i);
                        const body = { text };
                        if (attendantId)
                            body.attendantId = attendantId;
                        responseData = await this.helpers.httpRequest({ method: "POST", url: `${baseUrl}/api/chat/${chatId}/message`, headers: headersJson, body, json: true });
                    }
                    if (operation === "getMessageFile") {
                        const id = this.getNodeParameter("messageId", i);
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/chat/message/${id}/file`, headers, json: true });
                    }
                }
                // ─── CLIENTE ────────────────────────────────────────────────────────
                if (resource === "client") {
                    if (operation === "list") {
                        const perPage = this.getNodeParameter("perPage", i);
                        const field = this.getNodeParameter("clientField", i);
                        const searchValue = field ? this.getNodeParameter("clientSearchValue", i) : "";
                        const qs = { perPage };
                        if (field && searchValue) {
                            qs.field = field;
                            qs.value = searchValue;
                        }
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/client`, headers, qs, json: true });
                    }
                    if (operation === "get") {
                        const id = this.getNodeParameter("clientId", i);
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/client/${id}`, headers, json: true });
                    }
                    if (operation === "create") {
                        const name = this.getNodeParameter("clientName", i);
                        const email = this.getNodeParameter("clientEmail", i);
                        const identification = this.getNodeParameter("clientIdentification", i);
                        const birthday = this.getNodeParameter("clientBirthday", i);
                        const phonesRaw = this.getNodeParameter("clientPhones", i);
                        const tagsRaw = this.getNodeParameter("clientTags", i);
                        const phones = phonesRaw ? phonesRaw.split(",").map((p) => p.trim()).filter(Boolean) : [];
                        const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];
                        const body = { name, phones, tags };
                        if (email)
                            body.email = email;
                        if (identification)
                            body.identification = identification;
                        if (birthday)
                            body.birthday = birthday;
                        responseData = await this.helpers.httpRequest({ method: "POST", url: `${baseUrl}/api/client`, headers: headersJson, body, json: true });
                    }
                    if (operation === "update") {
                        const id = this.getNodeParameter("clientId", i);
                        const name = this.getNodeParameter("clientName", i);
                        const email = this.getNodeParameter("clientEmail", i);
                        const identification = this.getNodeParameter("clientIdentification", i);
                        const birthday = this.getNodeParameter("clientBirthday", i);
                        const phonesRaw = this.getNodeParameter("clientPhones", i);
                        const tagsRaw = this.getNodeParameter("clientTags", i);
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
                        responseData = await this.helpers.httpRequest({ method: "PUT", url: `${baseUrl}/api/client/${id}`, headers: headersJson, body, json: true });
                    }
                    if (operation === "delete") {
                        const id = this.getNodeParameter("clientId", i);
                        responseData = await this.helpers.httpRequest({ method: "DELETE", url: `${baseUrl}/api/client/${id}`, headers, json: true });
                    }
                }
                // ─── ETIQUETA ───────────────────────────────────────────────────────
                if (resource === "tag") {
                    if (operation === "list") {
                        const perPage = this.getNodeParameter("perPage", i);
                        const cursor = this.getNodeParameter("cursor", i);
                        const qs = { perPage };
                        if (cursor)
                            qs.cursor = cursor;
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/client-tag`, headers, qs, json: true });
                    }
                    if (operation === "get") {
                        const id = this.getNodeParameter("tagId", i);
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/client-tag/${id}`, headers, json: true });
                    }
                    if (operation === "create") {
                        const name = this.getNodeParameter("tagName", i);
                        const color = this.getNodeParameter("tagColor", i);
                        const fullname = this.getNodeParameter("tagFullname", i);
                        const code = this.getNodeParameter("tagCode", i);
                        const body = { name, color };
                        if (fullname)
                            body.fullname = fullname;
                        if (code)
                            body.code = code;
                        responseData = await this.helpers.httpRequest({ method: "POST", url: `${baseUrl}/api/client-tag`, headers: headersJson, body, json: true });
                    }
                    if (operation === "update") {
                        const id = this.getNodeParameter("tagId", i);
                        const name = this.getNodeParameter("tagName", i);
                        const color = this.getNodeParameter("tagColor", i);
                        const fullname = this.getNodeParameter("tagFullname", i);
                        const code = this.getNodeParameter("tagCode", i);
                        const body = {};
                        if (name)
                            body.name = name;
                        if (color)
                            body.color = color;
                        if (fullname)
                            body.fullname = fullname;
                        if (code)
                            body.code = code;
                        responseData = await this.helpers.httpRequest({ method: "PATCH", url: `${baseUrl}/api/client-tag/${id}`, headers: headersJson, body, json: true });
                    }
                    if (operation === "delete") {
                        const id = this.getNodeParameter("tagId", i);
                        responseData = await this.helpers.httpRequest({ method: "DELETE", url: `${baseUrl}/api/client-tag/${id}`, headers, json: true });
                    }
                }
                // ─── SETOR ──────────────────────────────────────────────────────────
                if (resource === "department") {
                    if (operation === "list") {
                        const perPage = this.getNodeParameter("perPage", i);
                        const cursor = this.getNodeParameter("cursor", i);
                        const field = this.getNodeParameter("deptField", i);
                        const value = field ? this.getNodeParameter("deptValue", i) : "";
                        const qs = { perPage };
                        if (cursor)
                            qs.cursor = cursor;
                        if (field && value) {
                            qs.field = field;
                            qs.value = value;
                        }
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/department`, headers, qs, json: true });
                    }
                    if (operation === "get") {
                        const id = this.getNodeParameter("departmentId", i);
                        responseData = await this.helpers.httpRequest({ method: "GET", url: `${baseUrl}/api/department/${id}`, headers, json: true });
                    }
                }
                returnData.push({ json: responseData, pairedItem: { item: i } });
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
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