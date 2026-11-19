import { ICredentialType, INodeProperties } from "n8n-workflow";

export class ChatlabsCrmApi implements ICredentialType {
  name = "chatlabsCrmApi";
  displayName = "Chatlabs CRM API";
  documentationUrl = "https://www.chatlabs.com.br";
  properties: INodeProperties[] = [
    {
      displayName: "Base URL",
      name: "baseUrl",
      type: "string",
      default: "",
      required: true,
      description:
        "URL base da API do CRM (sem /api no final). As rotas usadas ficam em {baseUrl}/api/integration/...",
    },
    {
      displayName: "Tenant Token",
      name: "tenantToken",
      type: "string",
      typeOptions: { password: true },
      default: "",
      required: true,
      description: "Token da empresa no CRM, enviado no header tenant-token",
    },
    {
      displayName: "System Token",
      name: "systemToken",
      type: "string",
      typeOptions: { password: true },
      default: "",
      description:
        "Token de sistema, enviado no header system-token quando preenchido",
    },
  ];
}
