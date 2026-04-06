"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [
    {
        displayName: "Nome",
        name: "clientName",
        type: "string",
        displayOptions: {
            show: { resource: ["client"], operation: ["update"] },
        },
        default: "",
        description: "Nome do cliente (opcional)",
    },
];
// clientId, clientPhones, clientEmail, clientIdentification, clientBirthday, clientTags
// are shared with get.ts and create.ts
async function execute(context, i, baseUrl, _headers, headersJson) {
    const id = context.getNodeParameter("clientId", i);
    const name = context.getNodeParameter("clientName", i);
    const email = context.getNodeParameter("clientEmail", i);
    const identification = context.getNodeParameter("clientIdentification", i);
    const birthday = context.getNodeParameter("clientBirthday", i);
    const phonesRaw = context.getNodeParameter("clientPhones", i);
    const tagsRaw = context.getNodeParameter("clientTags", i);
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
    return context.helpers.httpRequest({
        method: "PUT",
        url: `${baseUrl}/api/client/${id}`,
        headers: headersJson,
        body,
        json: true,
    });
}
//# sourceMappingURL=update.js.map