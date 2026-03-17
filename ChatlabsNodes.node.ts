import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IDataObject,
  NodeApiError,
} from "n8n-workflow";

export class ChatlabsNodes implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Chatlabs",
    name: "chatlabsNodes",
    icon: "file:chatlabs.png",
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
            name: "Listar Atendentes",
            value: "listAttendants",
            description: "Lista os atendentes da plataforma",
            action: "Listar atendentes",
          },
          {
            name: "Obter Atendente",
            value: "getAttendant",
            description: "Obtém um atendente pelo ID",
            action: "Obter atendente",
          },
        ],
        default: "listAttendants",
      },

      // === listAttendants ===
      {
        displayName: "Por Página",
        name: "perPage",
        type: "number",
        displayOptions: {
          show: {
            operation: ["listAttendants"],
          },
        },
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 10,
        description: "Número de atendentes por página",
      },
      // === getAttendant ===
      {
        displayName: "ID do Atendente",
        name: "attendantId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["getAttendant"],
          },
        },
        default: "",
        description: "ID do atendente a ser obtido",
      },

      {
        displayName: "Campo de Pesquisa",
        name: "field",
        type: "options",
        displayOptions: {
          show: {
            operation: ["listAttendants"],
          },
        },
        options: [
          { name: "Nenhum", value: "" },
          { name: "Nome Completo", value: "FULLNAME" },
          { name: "E-mail", value: "EMAIL" },
        ],
        default: "",
        description: "Campo para filtrar os atendentes (opcional)",
      },
      {
        displayName: "Valor da Pesquisa",
        name: "searchValue",
        type: "string",
        displayOptions: {
          show: {
            operation: ["listAttendants"],
            field: ["FULLNAME", "EMAIL"],
          },
        },
        default: "",
        description: "Valor a ser pesquisado no campo selecionado",
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
      accept: "application/json",
    };

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter("operation", i) as string;

      try {
        let responseData: IDataObject = {};

        if (operation === "listAttendants") {
          const perPage = this.getNodeParameter("perPage", i) as number;

          const field = this.getNodeParameter("field", i) as string;
          const searchValue = field
            ? (this.getNodeParameter("searchValue", i) as string)
            : "";

          const qs: IDataObject = { perPage };
          if (field && searchValue) {
            qs.field = field;
            qs.value = searchValue;
          }

          const response = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/attendant`,
            headers,
            qs,
            json: true,
          });

          responseData = response as IDataObject;
        }

        if (operation === "getAttendant") {
          const attendantId = this.getNodeParameter("attendantId", i) as string;

          const response = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/attendant/${attendantId}`,
            headers,
            json: true,
          });

          responseData = response as IDataObject;
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
