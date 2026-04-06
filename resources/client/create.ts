import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "Nome",
    name: "clientName",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["client"], operation: ["create"] },
    },
    default: "",
    description: "Nome do cliente",
  },
  {
    displayName: "Telefones",
    name: "clientPhones",
    type: "string",
    displayOptions: {
      show: { resource: ["client"], operation: ["create", "update"] },
    },
    default: "",
    description: "Telefones separados por vírgula (ex: +55 53 99999-9999, +55 11 98888-7777)",
  },
  {
    displayName: "E-mail",
    name: "clientEmail",
    type: "string",
    displayOptions: {
      show: { resource: ["client"], operation: ["create", "update"] },
    },
    default: "",
    description: "E-mail do cliente (opcional)",
  },
  {
    displayName: "Identificação",
    name: "clientIdentification",
    type: "string",
    displayOptions: {
      show: { resource: ["client"], operation: ["create", "update"] },
    },
    default: "",
    description: "CPF/CNPJ ou outro identificador (opcional)",
  },
  {
    displayName: "Data de Nascimento",
    name: "clientBirthday",
    type: "string",
    displayOptions: {
      show: { resource: ["client"], operation: ["create", "update"] },
    },
    default: "",
    placeholder: "DD/MM/AAAA",
    description: "Data de nascimento no formato DD/MM/AAAA (opcional)",
  },
  {
    displayName: "Tags",
    name: "clientTags",
    type: "string",
    displayOptions: {
      show: { resource: ["client"], operation: ["create", "update"] },
    },
    default: "",
    description: "Tags separadas por vírgula (opcional)",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  _headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const name = context.getNodeParameter("clientName", i) as string;
  const email = context.getNodeParameter("clientEmail", i) as string;
  const identification = context.getNodeParameter("clientIdentification", i) as string;
  const birthday = context.getNodeParameter("clientBirthday", i) as string;
  const phonesRaw = context.getNodeParameter("clientPhones", i) as string;
  const tagsRaw = context.getNodeParameter("clientTags", i) as string;
  const phones = phonesRaw ? phonesRaw.split(",").map((p) => p.trim()).filter(Boolean) : [];
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const body: IDataObject = { name, phones, tags };
  if (email) body.email = email;
  if (identification) body.identification = identification;
  if (birthday) body.birthday = birthday;
  return context.helpers.httpRequest({
    method: "POST",
    url: `${baseUrl}/api/client`,
    headers: headersJson,
    body,
    json: true,
  });
}
