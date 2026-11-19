import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION, compact } from "../utils";

const R = "contact";
const BASE = `${INTEGRATION}/contact`;

const contactFieldOptions: INodeProperties[] = [
  { displayName: "E-mail", name: "email", type: "string", default: "" },
  { displayName: "Telefone", name: "phone", type: "string", default: "" },
  {
    displayName: "CPF",
    name: "cpf",
    type: "string",
    default: "",
    placeholder: "000.000.000-00",
    description: "Com máscara (14 caracteres)",
  },
  { displayName: "Cargo", name: "responsability", type: "string", default: "" },
  {
    displayName: "ID da Empresa",
    name: "client_id",
    type: "string",
    default: "",
    description: "UUID da empresa (lead) no CRM",
  },
  {
    displayName: "ID de Integração",
    name: "integration_id",
    type: "string",
    default: "",
    description: "ID do contato no sistema de origem",
  },
];

export const operationOptions: INodeProperties = {
  displayName: "Operação",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: { show: { resource: [R] } },
  options: [
    { name: "Listar", value: "list", action: "Listar contatos" },
    { name: "Obter", value: "get", action: "Obter contato por ID" },
    { name: "Criar", value: "create", action: "Criar contato" },
    { name: "Atualizar", value: "update", action: "Atualizar contato" },
    { name: "Excluir", value: "delete", action: "Excluir contato" },
  ],
  default: "list",
};

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Contato",
    name: "contactId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: [R], operation: ["get", "update", "delete"] },
    },
    default: "",
  },
  {
    displayName: "Nome",
    name: "contactName",
    type: "string",
    required: true,
    displayOptions: { show: { resource: [R], operation: ["create", "update"] } },
    default: "",
    description: "Obrigatório também na atualização",
  },
  {
    displayName: "Campos Adicionais",
    name: "contactAdditional",
    type: "collection",
    placeholder: "Adicionar campo",
    displayOptions: { show: { resource: [R], operation: ["create", "update"] } },
    default: {},
    options: contactFieldOptions,
  },
  {
    displayName: "Filtros",
    name: "contactFilters",
    type: "collection",
    placeholder: "Adicionar filtro",
    displayOptions: { show: { resource: [R], operation: ["list"] } },
    default: {},
    options: [
      { displayName: "Pesquisa", name: "search", type: "string", default: "" },
      { displayName: "Telefone", name: "phone", type: "string", default: "" },
      { displayName: "ID da Etiqueta", name: "tag_id", type: "string", default: "" },
      { displayName: "Por Página", name: "per_page", type: "number", default: 50 },
      { displayName: "Página", name: "page", type: "number", default: 1 },
    ],
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  operation: string,
  baseUrl: string,
  headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject | IDataObject[]> {
  if (operation === "list") {
    const filters = context.getNodeParameter("contactFilters", i, {}) as IDataObject;
    return context.helpers.httpRequest({
      method: "GET",
      url: `${baseUrl}${BASE}/list`,
      headers,
      qs: compact(filters),
      json: true,
    });
  }
  if (operation === "create" || operation === "update") {
    const additional = context.getNodeParameter("contactAdditional", i, {}) as IDataObject;
    const body = compact({
      ...additional,
      name: context.getNodeParameter("contactName", i) as string,
    });
    if (operation === "create") {
      return context.helpers.httpRequest({
        method: "POST",
        url: `${baseUrl}${BASE}/store`,
        headers: headersJson,
        body,
        json: true,
      });
    }
    const id = context.getNodeParameter("contactId", i) as string;
    return context.helpers.httpRequest({
      method: "PUT",
      url: `${baseUrl}${BASE}/update/${id}`,
      headers: headersJson,
      body,
      json: true,
    });
  }
  const id = context.getNodeParameter("contactId", i) as string;
  if (operation === "get") {
    return context.helpers.httpRequest({
      method: "GET",
      url: `${baseUrl}${BASE}/load/${id}`,
      headers,
      json: true,
    });
  }
  if (operation === "delete") {
    return context.helpers.httpRequest({
      method: "DELETE",
      url: `${baseUrl}${BASE}/delete/${id}`,
      headers,
      json: true,
    });
  }
  throw new Error(`Operação desconhecida: ${operation}`);
}
