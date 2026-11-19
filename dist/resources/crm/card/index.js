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
const create = __importStar(require("./create"));
const update = __importStar(require("./update"));
const move = __importStar(require("./move"));
const listByContact = __importStar(require("./listByContact"));
const createByContact = __importStar(require("./createByContact"));
const moveByContact = __importStar(require("./moveByContact"));
exports.operationOptions = {
    displayName: "Operação",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: { show: { resource: ["card"] } },
    options: [
        { name: "Listar", value: "list", action: "Listar cards" },
        { name: "Obter", value: "get", action: "Obter card por ID" },
        { name: "Criar", value: "create", action: "Criar card" },
        { name: "Atualizar", value: "update", action: "Atualizar card" },
        { name: "Mover", value: "move", action: "Mover card de etapa" },
        {
            name: "Listar por Contato",
            value: "listByContact",
            action: "Listar cards de um contato",
        },
        {
            name: "Criar para Contato",
            value: "createByContact",
            action: "Criar card para um contato",
            description: "Não duplica card do contato no mesmo funil, salvo se forçado",
        },
        {
            name: "Mover por Contato",
            value: "moveByContact",
            action: "Mover cards de um contato",
            description: "Move os cards do contato da etapa de origem para a de destino",
        },
    ],
    default: "list",
};
exports.fields = [
    ...list.fields,
    ...get.fields,
    ...create.fields,
    ...update.fields,
    ...move.fields,
    ...listByContact.fields,
    ...createByContact.fields,
    ...moveByContact.fields,
];
async function execute(context, i, operation, baseUrl, headers, headersJson) {
    if (operation === "list")
        return list.execute(context, i, baseUrl, headers);
    if (operation === "get")
        return get.execute(context, i, baseUrl, headers);
    if (operation === "create")
        return create.execute(context, i, baseUrl, headersJson);
    if (operation === "update")
        return update.execute(context, i, baseUrl, headersJson);
    if (operation === "move")
        return move.execute(context, i, baseUrl, headersJson);
    if (operation === "listByContact")
        return listByContact.execute(context, i, baseUrl, headers);
    if (operation === "createByContact")
        return createByContact.execute(context, i, baseUrl, headersJson);
    if (operation === "moveByContact")
        return moveByContact.execute(context, i, baseUrl, headersJson);
    throw new Error(`Operação desconhecida: ${operation}`);
}
//# sourceMappingURL=index.js.map