"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [];
// clientId is shared with get.ts
async function execute(context, i, baseUrl, headers) {
    const id = context.getNodeParameter("clientId", i);
    return context.helpers.httpRequest({
        method: "DELETE",
        url: `${baseUrl}/api/client/${id}`,
        headers,
        json: true,
    });
}
//# sourceMappingURL=delete.js.map