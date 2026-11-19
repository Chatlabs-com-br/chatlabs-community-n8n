import {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeApiError,
} from "n8n-workflow";

import * as pipeline from "./resources/crm/pipeline";
import * as card from "./resources/crm/card";
import * as cardComment from "./resources/crm/cardComment";
import * as cardTask from "./resources/crm/cardTask";
import * as contact from "./resources/crm/contact";
import * as company from "./resources/crm/company";
import * as cardTag from "./resources/crm/cardTag";
import * as user from "./resources/crm/user";

export class ChatlabsCrm implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Chatlabs CRM",
    name: "chatlabsCrm",
    icon: "file:chatlabs.png",
    group: ["output"],
    version: 1,
    subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
    description: "Interaja com a API de integração do CRM do Chatlabs",
    defaults: {
      name: "Chatlabs CRM",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "chatlabsCrmApi",
        required: true,
      },
    ],
    properties: [
      {
        displayName: "Recurso",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          { name: "Card (Negociação)", value: "card" },
          { name: "Comentário de Card", value: "cardComment" },
          { name: "Contato", value: "contact" },
          { name: "Empresa", value: "company" },
          { name: "Etiqueta de Card", value: "cardTag" },
          { name: "Funil", value: "pipeline" },
          { name: "Tarefa de Card", value: "cardTask" },
          { name: "Usuário", value: "user" },
        ],
        default: "card",
      },
      card.operationOptions,
      cardComment.operationOptions,
      contact.operationOptions,
      company.operationOptions,
      cardTag.operationOptions,
      pipeline.operationOptions,
      cardTask.operationOptions,
      user.operationOptions,
      ...card.fields,
      ...cardComment.fields,
      ...contact.fields,
      ...company.fields,
      ...cardTag.fields,
      ...pipeline.fields,
      ...cardTask.fields,
      ...user.fields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const credentials = await this.getCredentials("chatlabsCrmApi");
    const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, "");
    const tenantToken = credentials.tenantToken as string;
    const systemToken = credentials.systemToken as string;

    const headers: Record<string, string> = {
      "tenant-token": tenantToken,
      accept: "application/json",
    };
    if (systemToken) headers["system-token"] = systemToken;
    const headersJson = { ...headers, "Content-Type": "application/json" };

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter("resource", i) as string;
      const operation = this.getNodeParameter("operation", i) as string;

      try {
        let responseData: IDataObject | IDataObject[];

        if (resource === "pipeline") {
          responseData = await pipeline.execute(this, i, operation, baseUrl, headers);
        } else if (resource === "user") {
          responseData = await user.execute(this, i, operation, baseUrl, headers);
        } else if (resource === "card") {
          responseData = await card.execute(this, i, operation, baseUrl, headers, headersJson);
        } else if (resource === "cardComment") {
          responseData = await cardComment.execute(this, i, operation, baseUrl, headers, headersJson);
        } else if (resource === "cardTask") {
          responseData = await cardTask.execute(this, i, operation, baseUrl, headers, headersJson);
        } else if (resource === "contact") {
          responseData = await contact.execute(this, i, operation, baseUrl, headers, headersJson);
        } else if (resource === "company") {
          responseData = await company.execute(this, i, operation, baseUrl, headers, headersJson);
        } else if (resource === "cardTag") {
          responseData = await cardTag.execute(this, i, operation, baseUrl, headers, headersJson);
        } else {
          throw new Error(`Recurso desconhecido: ${resource}`);
        }

        // Rotas de listagem do CRM devolvem array: cada elemento vira um item.
        if (Array.isArray(responseData)) {
          for (const entry of responseData) {
            returnData.push({ json: entry, pairedItem: { item: i } });
          }
        } else {
          returnData.push({ json: responseData ?? {}, pairedItem: { item: i } });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: (error as Error).message },
            pairedItem: { item: i },
          });
          continue;
        }
        throw new NodeApiError(
          this.getNode(),
          error as unknown as { message: string },
          { itemIndex: i },
        );
      }
    }

    return [returnData];
  }
}
