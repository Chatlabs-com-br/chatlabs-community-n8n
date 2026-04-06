"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
exports.execute = execute;
exports.fields = [];
async function execute(context, _i, baseUrl, headers) {
    return context.helpers.httpRequest({
        method: "GET",
        url: `${baseUrl}/api/channel`,
        headers,
        json: true,
    });
}
//# sourceMappingURL=list.js.map