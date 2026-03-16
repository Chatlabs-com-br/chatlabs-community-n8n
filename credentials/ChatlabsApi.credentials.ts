import { ICredentialType, INodeProperties } from "n8n-workflow";

export class ChatlabsApi implements ICredentialType {
  name = "chatlabsApi";
  displayName = "Chatlabs API";
  documentationUrl = "https://chatlabs.io/docs";
  properties: INodeProperties[] = [
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