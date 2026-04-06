import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeApiError,
} from "n8n-workflow";

import * as attendant from "./resources/attendant";
import * as channel from "./resources/channel";
import * as chat from "./resources/chat";
import * as client from "./resources/client";
import * as tag from "./resources/tag";
import * as department from "./resources/department";

export class ChatlabsNodes implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Chatlabs",
    name: "chatlabsNodes",
    icon: "file:chatlabs.png",
    group: ["output"],
    version: 1,
    subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
    description: "Interaja com a API do Chatlabs",
    defaults: {
      name: "Chatlabs",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "chatlabsApi",
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
          { name: "Atendente", value: "attendant" },
          { name: "Canal", value: "channel" },
          { name: "Chat", value: "chat" },
          { name: "Cliente", value: "client" },
          { name: "Etiqueta", value: "tag" },
          { name: "Setor", value: "department" },
        ],
        default: "attendant",
      },
      attendant.operationOptions,
      channel.operationOptions,
      chat.operationOptions,
      client.operationOptions,
      tag.operationOptions,
      department.operationOptions,
      ...attendant.fields,
      ...channel.fields,
      ...chat.fields,
      ...client.fields,
      ...tag.fields,
      ...department.fields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const credentials = await this.getCredentials("chatlabsApi");
    const baseUrl = (credentials.baseUrl as string).replace(/\/$/, "");
    const apiKey = credentials.apiKey as string;

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      accept: "application/json",
    };
    const headersJson = { ...headers, "Content-Type": "application/json" };

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter("resource", i) as string;
      const operation = this.getNodeParameter("operation", i) as string;

      try {
        let responseData: import("n8n-workflow").IDataObject;

        if (resource === "attendant") {
          responseData = await attendant.execute(
            this,
            i,
            operation,
            baseUrl,
            headers,
          );
        } else if (resource === "channel") {
          responseData = await channel.execute(
            this,
            i,
            operation,
            baseUrl,
            headers,
          );
        } else if (resource === "chat") {
          responseData = await chat.execute(
            this,
            i,
            operation,
            baseUrl,
            headers,
            headersJson,
          );
        } else if (resource === "client") {
          responseData = await client.execute(
            this,
            i,
            operation,
            baseUrl,
            headers,
            headersJson,
          );
        } else if (resource === "tag") {
          responseData = await tag.execute(
            this,
            i,
            operation,
            baseUrl,
            headers,
            headersJson,
          );
        } else if (resource === "department") {
          responseData = await department.execute(
            this,
            i,
            operation,
            baseUrl,
            headers,
          );
        } else {
          throw new Error(`Recurso desconhecido: ${resource}`);
        }

        returnData.push({ json: responseData, pairedItem: { item: i } });
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
