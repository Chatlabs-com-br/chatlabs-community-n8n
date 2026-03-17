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
          {
            name: "Listar Clientes",
            value: "listClients",
            description: "Lista os clientes da plataforma",
            action: "Listar clientes",
          },
          {
            name: "Obter Cliente",
            value: "getClient",
            description: "Obtém um cliente pelo ID",
            action: "Obter cliente",
          },
          {
            name: "Criar Cliente",
            value: "createClient",
            description: "Cria um novo cliente na plataforma",
            action: "Criar cliente",
          },
          {
            name: "Atualizar Cliente",
            value: "updateClient",
            description: "Atualiza os dados de um cliente",
            action: "Atualizar cliente",
          },
          {
            name: "Deletar Cliente",
            value: "deleteClient",
            description: "Remove um cliente da plataforma",
            action: "Deletar cliente",
          },
          {
            name: "Listar Etiquetas",
            value: "listTags",
            description: "Lista as etiquetas da plataforma",
            action: "Listar etiquetas",
          },
          {
            name: "Obter Etiqueta",
            value: "getTag",
            description: "Obtém uma etiqueta pelo ID",
            action: "Obter etiqueta",
          },
          {
            name: "Criar Etiqueta",
            value: "createTag",
            description: "Cria uma nova etiqueta",
            action: "Criar etiqueta",
          },
          {
            name: "Atualizar Etiqueta",
            value: "updateTag",
            description: "Atualiza os dados de uma etiqueta",
            action: "Atualizar etiqueta",
          },
          {
            name: "Deletar Etiqueta",
            value: "deleteTag",
            description: "Remove uma etiqueta da plataforma",
            action: "Deletar etiqueta",
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

      // === listTags ===
      {
        displayName: "Por Página",
        name: "tagPerPage",
        type: "number",
        displayOptions: { show: { operation: ["listTags"] } },
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 10,
        description: "Número de etiquetas por página",
      },
      {
        displayName: "Cursor",
        name: "tagCursor",
        type: "string",
        displayOptions: { show: { operation: ["listTags"] } },
        default: "",
        description: "Cursor de paginação (opcional)",
      },

      // === getTag ===
      {
        displayName: "ID da Etiqueta",
        name: "getTagId",
        type: "string",
        required: true,
        displayOptions: { show: { operation: ["getTag"] } },
        default: "",
        description: "ID da etiqueta a ser obtida",
      },

      // === createTag ===
      {
        displayName: "Nome",
        name: "createTagName",
        type: "string",
        required: true,
        displayOptions: { show: { operation: ["createTag"] } },
        default: "",
        description: "Nome da etiqueta",
      },
      {
        displayName: "Cor",
        name: "createTagColor",
        type: "color",
        displayOptions: { show: { operation: ["createTag"] } },
        default: "#ffffff",
        description: "Cor da etiqueta",
      },
      {
        displayName: "Nome Completo",
        name: "createTagFullname",
        type: "string",
        displayOptions: { show: { operation: ["createTag"] } },
        default: "",
        description: "Nome completo da etiqueta (opcional)",
      },
      {
        displayName: "Código",
        name: "createTagCode",
        type: "string",
        displayOptions: { show: { operation: ["createTag"] } },
        default: "",
        description: "Código da etiqueta (opcional)",
      },

      // === updateTag ===
      {
        displayName: "ID da Etiqueta",
        name: "updateTagId",
        type: "string",
        required: true,
        displayOptions: { show: { operation: ["updateTag"] } },
        default: "",
        description: "ID da etiqueta a ser atualizada",
      },
      {
        displayName: "Nome",
        name: "updateTagName",
        type: "string",
        displayOptions: { show: { operation: ["updateTag"] } },
        default: "",
        description: "Nome da etiqueta (opcional)",
      },
      {
        displayName: "Cor",
        name: "updateTagColor",
        type: "color",
        displayOptions: { show: { operation: ["updateTag"] } },
        default: "#ffffff",
        description: "Cor da etiqueta (opcional)",
      },
      {
        displayName: "Nome Completo",
        name: "updateTagFullname",
        type: "string",
        displayOptions: { show: { operation: ["updateTag"] } },
        default: "",
        description: "Nome completo da etiqueta (opcional)",
      },
      {
        displayName: "Código",
        name: "updateTagCode",
        type: "string",
        displayOptions: { show: { operation: ["updateTag"] } },
        default: "",
        description: "Código da etiqueta (opcional)",
      },

      // === deleteTag ===
      {
        displayName: "ID da Etiqueta",
        name: "deleteTagId",
        type: "string",
        required: true,
        displayOptions: { show: { operation: ["deleteTag"] } },
        default: "",
        description: "ID da etiqueta a ser deletada",
      },

      // === updateClient ===
      {
        displayName: "ID do Cliente",
        name: "updateClientId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["updateClient"],
          },
        },
        default: "",
        description: "ID do cliente a ser atualizado",
      },
      {
        displayName: "Nome",
        name: "updateClientName",
        type: "string",
        displayOptions: {
          show: {
            operation: ["updateClient"],
          },
        },
        default: "",
        description: "Nome do cliente (opcional)",
      },
      {
        displayName: "Telefones",
        name: "updateClientPhones",
        type: "string",
        displayOptions: {
          show: {
            operation: ["updateClient"],
          },
        },
        default: "",
        description: "Telefones separados por vírgula (opcional)",
      },
      {
        displayName: "E-mail",
        name: "updateClientEmail",
        type: "string",
        displayOptions: {
          show: {
            operation: ["updateClient"],
          },
        },
        default: "",
        description: "E-mail do cliente (opcional)",
      },
      {
        displayName: "Identificação",
        name: "updateClientIdentification",
        type: "string",
        displayOptions: {
          show: {
            operation: ["updateClient"],
          },
        },
        default: "",
        description: "CPF/CNPJ ou outro identificador (opcional)",
      },
      {
        displayName: "Data de Nascimento",
        name: "updateClientBirthday",
        type: "string",
        displayOptions: {
          show: {
            operation: ["updateClient"],
          },
        },
        default: "",
        placeholder: "DD/MM/AAAA",
        description: "Data de nascimento no formato DD/MM/AAAA (opcional)",
      },
      {
        displayName: "Tags",
        name: "updateClientTags",
        type: "string",
        displayOptions: {
          show: {
            operation: ["updateClient"],
          },
        },
        default: "",
        description: "Tags separadas por vírgula (opcional)",
      },

      // === deleteClient ===
      {
        displayName: "ID do Cliente",
        name: "deleteClientId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["deleteClient"],
          },
        },
        default: "",
        description: "ID do cliente a ser deletado",
      },

      // === createClient ===
      {
        displayName: "Nome",
        name: "createClientName",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createClient"],
          },
        },
        default: "",
        description: "Nome do cliente",
      },
      {
        displayName: "Telefones",
        name: "createClientPhones",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createClient"],
          },
        },
        default: "",
        description: "Telefones separados por vírgula (ex: +55 53 99999-9999, +55 11 98888-7777)",
      },
      {
        displayName: "E-mail",
        name: "createClientEmail",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createClient"],
          },
        },
        default: "",
        description: "E-mail do cliente (opcional)",
      },
      {
        displayName: "Identificação",
        name: "createClientIdentification",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createClient"],
          },
        },
        default: "",
        description: "CPF/CNPJ ou outro identificador (opcional)",
      },
      {
        displayName: "Data de Nascimento",
        name: "createClientBirthday",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createClient"],
          },
        },
        default: "",
        placeholder: "DD/MM/AAAA",
        description: "Data de nascimento no formato DD/MM/AAAA (opcional)",
      },
      {
        displayName: "Tags",
        name: "createClientTags",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createClient"],
          },
        },
        default: "",
        description: "Tags separadas por vírgula (opcional)",
      },

      // === getClient ===
      {
        displayName: "ID do Cliente",
        name: "clientId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["getClient"],
          },
        },
        default: "",
        description: "ID do cliente a ser obtido",
      },

      // === listClients ===
      {
        displayName: "Por Página",
        name: "clientPerPage",
        type: "number",
        displayOptions: {
          show: {
            operation: ["listClients"],
          },
        },
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 10,
        description: "Número de clientes por página",
      },
      {
        displayName: "Campo de Pesquisa",
        name: "clientField",
        type: "options",
        displayOptions: {
          show: {
            operation: ["listClients"],
          },
        },
        options: [
          { name: "Nenhum", value: "" },
          { name: "Nome", value: "NAME" },
          { name: "E-mail", value: "EMAIL" },
          { name: "Identificação", value: "IDENTIFICATION" },
          { name: "Telefone", value: "PHONE" },
          { name: "Tags", value: "TAGS" },
        ],
        default: "",
        description: "Campo para filtrar os clientes (opcional)",
      },
      {
        displayName: "Valor da Pesquisa",
        name: "clientSearchValue",
        type: "string",
        displayOptions: {
          show: {
            operation: ["listClients"],
            clientField: ["NAME", "EMAIL", "IDENTIFICATION", "PHONE", "TAGS"],
          },
        },
        default: "",
        description: "Valor a ser pesquisado no campo selecionado",
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

        if (operation === "listTags") {
          const perPage = this.getNodeParameter("tagPerPage", i) as number;
          const cursor = this.getNodeParameter("tagCursor", i) as string;
          const qs: IDataObject = { perPage };
          if (cursor) qs.cursor = cursor;

          const response = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/client-tag`,
            headers,
            qs,
            json: true,
          });
          responseData = response as IDataObject;
        }

        if (operation === "getTag") {
          const tagId = this.getNodeParameter("getTagId", i) as string;

          const response = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/client-tag/${tagId}`,
            headers,
            json: true,
          });
          responseData = response as IDataObject;
        }

        if (operation === "createTag") {
          const name = this.getNodeParameter("createTagName", i) as string;
          const color = this.getNodeParameter("createTagColor", i) as string;
          const fullname = this.getNodeParameter("createTagFullname", i) as string;
          const code = this.getNodeParameter("createTagCode", i) as string;

          const body: IDataObject = { name, color };
          if (fullname) body.fullname = fullname;
          if (code) body.code = code;

          const response = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/api/client-tag`,
            headers: { ...headers, "Content-Type": "application/json" },
            body,
            json: true,
          });
          responseData = response as IDataObject;
        }

        if (operation === "updateTag") {
          const tagId = this.getNodeParameter("updateTagId", i) as string;
          const name = this.getNodeParameter("updateTagName", i) as string;
          const color = this.getNodeParameter("updateTagColor", i) as string;
          const fullname = this.getNodeParameter("updateTagFullname", i) as string;
          const code = this.getNodeParameter("updateTagCode", i) as string;

          const body: IDataObject = {};
          if (name) body.name = name;
          if (color) body.color = color;
          if (fullname) body.fullname = fullname;
          if (code) body.code = code;

          const response = await this.helpers.httpRequest({
            method: "PATCH",
            url: `${baseUrl}/api/client-tag/${tagId}`,
            headers: { ...headers, "Content-Type": "application/json" },
            body,
            json: true,
          });
          responseData = response as IDataObject;
        }

        if (operation === "deleteTag") {
          const tagId = this.getNodeParameter("deleteTagId", i) as string;

          const response = await this.helpers.httpRequest({
            method: "DELETE",
            url: `${baseUrl}/api/client-tag/${tagId}`,
            headers,
            json: true,
          });
          responseData = response as IDataObject;
        }

        if (operation === "updateClient") {
          const clientId = this.getNodeParameter("updateClientId", i) as string;
          const name = this.getNodeParameter("updateClientName", i) as string;
          const email = this.getNodeParameter("updateClientEmail", i) as string;
          const identification = this.getNodeParameter("updateClientIdentification", i) as string;
          const birthday = this.getNodeParameter("updateClientBirthday", i) as string;
          const phonesRaw = this.getNodeParameter("updateClientPhones", i) as string;
          const tagsRaw = this.getNodeParameter("updateClientTags", i) as string;

          const body: IDataObject = {};
          if (name) body.name = name;
          if (email) body.email = email;
          if (identification) body.identification = identification;
          if (birthday) body.birthday = birthday;
          if (phonesRaw) body.phones = phonesRaw.split(",").map((p) => p.trim()).filter(Boolean);
          if (tagsRaw) body.tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);

          const response = await this.helpers.httpRequest({
            method: "PUT",
            url: `${baseUrl}/api/client/${clientId}`,
            headers: { ...headers, "Content-Type": "application/json" },
            body,
            json: true,
          });

          responseData = response as IDataObject;
        }

        if (operation === "deleteClient") {
          const clientId = this.getNodeParameter("deleteClientId", i) as string;

          const response = await this.helpers.httpRequest({
            method: "DELETE",
            url: `${baseUrl}/api/client/${clientId}`,
            headers,
            json: true,
          });

          responseData = response as IDataObject;
        }

        if (operation === "createClient") {
          const name = this.getNodeParameter("createClientName", i) as string;
          const email = this.getNodeParameter("createClientEmail", i) as string;
          const identification = this.getNodeParameter("createClientIdentification", i) as string;
          const birthday = this.getNodeParameter("createClientBirthday", i) as string;
          const phonesRaw = this.getNodeParameter("createClientPhones", i) as string;
          const tagsRaw = this.getNodeParameter("createClientTags", i) as string;

          const phones = phonesRaw
            ? phonesRaw.split(",").map((p) => p.trim()).filter(Boolean)
            : [];
          const tags = tagsRaw
            ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
            : [];

          const body: IDataObject = { name, phones, tags };
          if (email) body.email = email;
          if (identification) body.identification = identification;
          if (birthday) body.birthday = birthday;

          const response = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/api/client`,
            headers: { ...headers, "Content-Type": "application/json" },
            body,
            json: true,
          });

          responseData = response as IDataObject;
        }

        if (operation === "getClient") {
          const clientId = this.getNodeParameter("clientId", i) as string;

          const response = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/client/${clientId}`,
            headers,
            json: true,
          });

          responseData = response as IDataObject;
        }

        if (operation === "listClients") {
          const perPage = this.getNodeParameter("clientPerPage", i) as number;
          const field = this.getNodeParameter("clientField", i) as string;
          const searchValue = field
            ? (this.getNodeParameter("clientSearchValue", i) as string)
            : "";

          const qs: IDataObject = { perPage };
          if (field && searchValue) {
            qs.field = field;
            qs.value = searchValue;
          }

          const response = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/client`,
            headers,
            qs,
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
