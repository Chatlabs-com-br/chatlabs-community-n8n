import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IDataObject,
  NodeApiError,
  NodeOperationError,
} from "n8n-workflow";

export class ChatlabsNodes implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Chatlabs",
    name: "chatlabsNodes",
    group: ["output"],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
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
        displayName: "Operação",
        name: "operation",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Enviar Mensagem",
            value: "sendMessage",
            description: "Envia uma mensagem para um agente ou conversa",
            action: "Enviar uma mensagem",
          },
          {
            name: "Criar Conversa",
            value: "createConversation",
            description: "Cria uma nova conversa",
            action: "Criar uma conversa",
          },
          {
            name: "Listar Conversas",
            value: "listConversations",
            description: "Lista todas as conversas",
            action: "Listar conversas",
          },
          {
            name: "Obter Conversa",
            value: "getConversation",
            description: "Obtém detalhes de uma conversa específica",
            action: "Obter uma conversa",
          },
        ],
        default: "sendMessage",
      },

      // === sendMessage ===
      {
        displayName: "ID da Conversa",
        name: "conversationId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["sendMessage"],
          },
        },
        default: "",
        description: "ID da conversa para enviar a mensagem",
      },
      {
        displayName: "Mensagem",
        name: "message",
        type: "string",
        typeOptions: { rows: 4 },
        required: true,
        displayOptions: {
          show: {
            operation: ["sendMessage"],
          },
        },
        default: "",
        description: "Conteúdo da mensagem a ser enviada",
      },
      {
        displayName: "Papel",
        name: "role",
        type: "options",
        displayOptions: {
          show: {
            operation: ["sendMessage"],
          },
        },
        options: [
          { name: "Usuário", value: "user" },
          { name: "Assistente", value: "assistant" },
        ],
        default: "user",
        description: "Papel do remetente da mensagem",
      },

      // === createConversation ===
      {
        displayName: "Título",
        name: "title",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createConversation"],
          },
        },
        default: "",
        description: "Título da conversa (opcional)",
      },
      {
        displayName: "ID do Agente",
        name: "agentId",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createConversation"],
          },
        },
        default: "",
        description: "ID do agente para associar à conversa (opcional)",
      },
      {
        displayName: "Metadados",
        name: "metadata",
        type: "json",
        displayOptions: {
          show: {
            operation: ["createConversation"],
          },
        },
        default: "{}",
        description: "Metadados adicionais em formato JSON (opcional)",
      },

      // === listConversations ===
      {
        displayName: "Limite",
        name: "limit",
        type: "number",
        displayOptions: {
          show: {
            operation: ["listConversations"],
          },
        },
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 20,
        description: "Número máximo de conversas a retornar",
      },

      // === getConversation ===
      {
        displayName: "ID da Conversa",
        name: "conversationId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["getConversation"],
          },
        },
        default: "",
        description: "ID da conversa a ser obtida",
      },
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
      "Content-Type": "application/json",
    };

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter("operation", i) as string;

      try {
        let responseData: IDataObject = {};

        if (operation === "sendMessage") {
          const conversationId = this.getNodeParameter(
            "conversationId",
            i,
          ) as string;
          const message = this.getNodeParameter("message", i) as string;
          const role = this.getNodeParameter("role", i) as string;

          const response = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/v1/conversations/${conversationId}/messages`,
            headers,
            body: { role, content: message },
            json: true,
          });

          responseData = response as IDataObject;
        } else if (operation === "createConversation") {
          const title = this.getNodeParameter("title", i) as string;
          const agentId = this.getNodeParameter("agentId", i) as string;
          const metadataRaw = this.getNodeParameter("metadata", i) as string;

          let metadata: IDataObject = {};
          try {
            metadata =
              typeof metadataRaw === "string"
                ? JSON.parse(metadataRaw)
                : metadataRaw;
          } catch {
            throw new NodeOperationError(
              this.getNode(),
              "Metadados devem ser um JSON válido",
              { itemIndex: i },
            );
          }

          const body: IDataObject = {};
          if (title) body.title = title;
          if (agentId) body.agentId = agentId;
          if (Object.keys(metadata).length > 0) body.metadata = metadata;

          const response = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/v1/conversations`,
            headers,
            body,
            json: true,
          });

          responseData = response as IDataObject;
        } else if (operation === "listConversations") {
          const limit = this.getNodeParameter("limit", i) as number;

          const response = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/v1/conversations`,
            headers,
            qs: { limit },
            json: true,
          });

          responseData = response as IDataObject;
        } else if (operation === "getConversation") {
          const conversationId = this.getNodeParameter(
            "conversationId",
            i,
          ) as string;

          const response = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/v1/conversations/${conversationId}`,
            headers,
            json: true,
          });

          responseData = response as IDataObject;
        } else {
          throw new NodeOperationError(
            this.getNode(),
            `Operação desconhecida: ${operation}`,
            { itemIndex: i },
          );
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
        if (error instanceof NodeOperationError) throw error;
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
