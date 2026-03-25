"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = exports.operationOptions = void 0;
exports.execute = execute;
const list = __importStar(require("./list"));
const get = __importStar(require("./get"));
exports.operationOptions = {
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
};
exports.fields = [...list.fields, ...get.fields];
async function execute(context, i, operation, baseUrl, headers) {
    if (operation === "list")
        return list.execute(context, i, baseUrl, headers);
    if (operation === "get")
        return get.execute(context, i, baseUrl, headers);
    throw new Error(`Operação desconhecida: ${operation}`);
}
//# sourceMappingURL=index.js.map