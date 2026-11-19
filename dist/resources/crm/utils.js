"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priorityOptions = exports.INTEGRATION = void 0;
exports.csv = csv;
exports.compact = compact;
exports.INTEGRATION = "/api/integration";
function csv(value) {
    if (typeof value !== "string")
        return [];
    return value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
}
// Remove chaves vazias para não sobrescrever dados no CRM com "".
function compact(obj) {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
        if (v === undefined || v === null || v === "")
            continue;
        out[k] = v;
    }
    return out;
}
exports.priorityOptions = [
    { name: "Baixa", value: "LOW" },
    { name: "Normal", value: "NORMAL" },
    { name: "Alta", value: "HIGH" },
    { name: "Urgente", value: "URGENT" },
];
//# sourceMappingURL=utils.js.map