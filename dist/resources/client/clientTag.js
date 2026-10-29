"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
const operations = ["addTag", "removeTag"];
exports.fields = [
    {
        displayName: "ID do Cliente",
        name: "tagClientId",
        type: "string",
        required: true,
        displayOptions: { show: { resource: ["client"], operation: operations } },
        default: "",
        description: "ID do cliente que receberá ou perderá a etiqueta",
    },
    {
        displayName: "Identificar Etiqueta Por",
        name: "clientTagBy",
        type: "options",
        displayOptions: { show: { resource: ["client"], operation: operations } },
        options: [
            { name: "Nome", value: "name" },
            { name: "ID", value: "id" },
        ],
        default: "name",
        description: "Como localizar a etiqueta",
    },
    {
        displayName: "Etiqueta",
        name: "clientTagValue",
        type: "string",
        required: true,
        displayOptions: { show: { resource: ["client"], operation: operations } },
        default: "",
        description: "Nome ou ID da etiqueta. Se ela não existir, a saída traz tagNotFound: true em vez de erro",
    },
];
function safeStringify(value) {
    const seen = new WeakSet();
    try {
        return JSON.stringify(value, (_key, v) => {
            if (typeof v === "object" && v !== null) {
                if (seen.has(v))
                    return undefined;
                seen.add(v);
            }
            return v;
        });
    }
    catch {
        return "";
    }
}
function statusCodeOf(error) {
    var _a, _b, _c, _d;
    const e = error;
    const direct = Number((_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : e === null || e === void 0 ? void 0 : e.statusCode) !== null && _c !== void 0 ? _c : e === null || e === void 0 ? void 0 : e.httpCode);
    if (direct)
        return direct;
    const match = /status code (\d{3})/.exec(String((_d = e === null || e === void 0 ? void 0 : e.message) !== null && _d !== void 0 ? _d : ""));
    return match ? Number(match[1]) : undefined;
}
function isTagNotFound(error) {
    const e = error;
    const text = [e === null || e === void 0 ? void 0 : e.message, e === null || e === void 0 ? void 0 : e.description, safeStringify(e)]
        .filter((p) => typeof p === "string")
        .join(" ");
    return text.includes("CLIENT_TAG__NOT_FOUND");
}
async function execute(context, i, baseUrl, headers, headersJson, action) {
    const clientId = context.getNodeParameter("tagClientId", i);
    const by = context.getNodeParameter("clientTagBy", i);
    const value = context.getNodeParameter("clientTagValue", i);
    const body = by === "id" ? { tagId: value } : { tagName: value };
    try {
        return await context.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/api/client/${clientId}/${action}`,
            headers: headersJson,
            body,
            json: true,
        });
    }
    catch (error) {
        const notFound = { tagNotFound: true, clientId, [by === "id" ? "tagId" : "tagName"]: value };
        if (isTagNotFound(error))
            return notFound;
        // O n8n nem sempre entrega o corpo do erro. Um 404 pode ser da etiqueta ou do
        // cliente, então confirma se o cliente existe antes de dizer que falta a etiqueta.
        if (statusCodeOf(error) === 404) {
            const clientExists = await context.helpers
                .httpRequest({ method: "GET", url: `${baseUrl}/api/client/${clientId}`, headers, json: true })
                .then(() => true)
                .catch(() => false);
            if (clientExists)
                return notFound;
        }
        throw error;
    }
}
//# sourceMappingURL=clientTag.js.map