"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatlabsApi = void 0;
class ChatlabsApi {
    constructor() {
        this.name = "chatlabsApi";
        this.displayName = "Chatlabs API";
        this.documentationUrl = "https://chatlabs.io/docs";
        this.properties = [
            {
                displayName: "API Key",
                name: "apiKey",
                type: "string",
                typeOptions: { password: true },
                default: "",
                required: true,
                description: "Chave de API do Chatlabs",
            },
            {
                displayName: "Base URL",
                name: "baseUrl",
                type: "string",
                default: "https://api.chatlabs.io",
                required: true,
                description: "URL base da API do Chatlabs",
            },
        ];
    }
}
exports.ChatlabsApi = ChatlabsApi;
//# sourceMappingURL=ChatlabsApi.credentials.js.map