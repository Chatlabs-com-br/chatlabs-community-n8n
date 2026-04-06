"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [];
// chatId and perPage/cursor are shared with get.ts and list.ts respectively
async function execute(context, i, baseUrl, headers) {
    const id = context.getNodeParameter("chatId", i);
    const perPage = context.getNodeParameter("perPage", i);
    const cursor = context.getNodeParameter("cursor", i);
    const qs = { perPage };
    if (cursor)
        qs.cursor = cursor;
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}/api/chat/${id}/messages`,
        headers,
        qs,
        json: true,
    });
}
//# sourceMappingURL=listMessages.js.map