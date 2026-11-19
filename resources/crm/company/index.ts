import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION, compact, csv } from "../utils";

const R = "company";
const BASE = `${INTEGRATION}/client`;

const companyFieldOptions: INodeProperties[] = [
  {
    displayName: "CPF/CNPJ",
    name: "cpf_cnpj",
    type: "string",
    default: "",
  },
  { displayName: "Telefone", name: "phone", type: "string", default: "" },
  { displayName: "E-mail", name: "email", type: "string", default: "" },
  {
    displayName: "IDs das Etiquetas",
    name: "tags",
    type: "string",
    default: "",
    description: "UUIDs de etiquetas, separados por vírgula",
  },
  {
    displayName: "ID de Integração",
    name: "integration_id",
    type: "string",
    default: "",
    description: "ID da empresa no sistema de origem",
  },
];

export const operationOptions: INodeProperties = {
  displayName: "Operação",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: { show: { resource: [R] } },
  options: [
    { name: "Listar", value: "list", action: "Listar empresas" },
    { name: "Obter", value: "get", action: "Obter empresa por ID" },
    { name: "Criar", value: "create", action: "Criar empresa" },
    { name: "Atualizar", value: "update", action: "Atualizar empresa" },
    { name: "Excluir", value: "delete", action: "Excluir empresa" },
  ],
  default: "list",
};

export const fields: INodeProperties[] = [
  {
    displayName: "ID da Empresa",
    name: "companyId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: [R], operation: ["get", "update", "delete"] },
    },
    default: "",
  },
  {
    displayName: "Nome",
    name: "companyName",
    type: "string",
    required: true,
    displayOptions: { show: { resource: [R], operation: ["create"] } },
    default: "",
    description: "Único por empresa no CRM",
  },
  {
    displayName: "Campos Adicionais",
    name: "companyAdditional",
    type: "collection",
    placeholder: "Adicionar campo",
    displayOptions: { show: { resource: [R], operation: ["create"] } },
    default: {},
    options: companyFieldOptions,
  },
  {
    displayName: "Campos para Atualizar",
    name: "companyUpdateFields",
    type: "collection",
    placeholder: "Adicionar campo",
    displayOptions: { show: { resource: [R], operation: ["update"] } },
    default: {},
    options: [
      { displayName: "Nome", name: "name", type: "string", default: "" },
      ...companyFieldOptions,
    ],
  },
  {
    displayName: "Filtros",
    name: "companyFilters",
    type: "collection",
    placeholder: "Adicionar filtro",
    displayOptions: { show: { resource: [R], operation: ["list"] } },
    default: {},
    options: [
      { displayName: "Pesquisa", name: "search", type: "string", default: "" },
      { displayName: "Telefone", name: "phone", type: "string", default: "" },
      { displayName: "CPF/CNPJ", name: "cpf_cnpj", type: "string", default: "" },
      { displayName: "ID da Etiqueta", name: "tag_id", type: "string", default: "" },
      {
        displayName: "Criada a Partir De",
        name: "created_from",
        type: "string",
        default: "",
        placeholder: "2026-01-01",
      },
      {
        displayName: "Criada Até",
        name: "created_to",
        type: "string",
        default: "",
        placeholder: "2026-12-31",
      },
      { displayName: "Por Página", name: "per_page", type: "number", default: 50 },
      { displayName: "Página", name: "page", type: "number", default: 1 },
    ],
  },
];

function buildBody(raw: IDataObject): IDataObject {
  const body = compact(raw);
  if (raw.tags !== undefined) body.tags = csv(raw.tags);
  return body;
}

export async function execute(
  context: IExecuteFunctions,
  i: number,
  operation: string,
  baseUrl: string,
  headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject | IDataObject[]> {
  if (operation === "list") {
    const filters = context.getNodeParameter("companyFilters", i, {}) as IDataObject;
    return context.helpers.httpRequest({
      method: "GET",
      url: `${baseUrl}${BASE}/list`,
      headers,
      qs: compact(filters),
      json: true,
    });
  }
  if (operation === "create") {
    const additional = context.getNodeParameter("companyAdditional", i, {}) as IDataObject;
    return context.helpers.httpRequest({
      method: "POST",
      url: `${baseUrl}${BASE}/store`,
      headers: headersJson,
      body: buildBody({
        ...additional,
        name: context.getNodeParameter("companyName", i) as string,
      }),
      json: true,
    });
  }
  const id = context.getNodeParameter("companyId", i) as string;
  if (operation === "update") {
    const updates = context.getNodeParameter("companyUpdateFields", i, {}) as IDataObject;
    return context.helpers.httpRequest({
      method: "PUT",
      url: `${baseUrl}${BASE}/update/${id}`,
      headers: headersJson,
      body: buildBody(updates),
      json: true,
    });
  }
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
