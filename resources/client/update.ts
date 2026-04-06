import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "Nome",
    name: "clientName",
    type: "string",
    displayOptions: {
      show: { resource: ["client"], operation: ["update"] },
    },
    default: "",
    description: "Nome do cliente (opcional)",
  },
];
// clientId, clientPhones, clientEmail, clientIdentification, clientBirthday, clientTags
// are shared with get.ts and create.ts

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  _headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("clientId", i) as string;
  const name = context.getNodeParameter("clientName", i) as string;
  const email = context.getNodeParameter("clientEmail", i) as string;
  const identification = context.getNodeParameter("clientIdentification", i) as string;
  const birthday = context.getNodeParameter("clientBirthday", i) as string;
  const phonesRaw = context.getNodeParameter("clientPhones", i) as string;
  const tagsRaw = context.getNodeParameter("clientTags", i) as string;
  const body: IDataObject = {};
  if (name) body.name = name;
  if (email) body.email = email;
  if (identification) body.identification = identification;
  if (birthday) body.birthday = birthday;
  if (phonesRaw) body.phones = phonesRaw.split(",").map((p) => p.trim()).filter(Boolean);
  if (tagsRaw) body.tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
  return context.helpers.httpRequest({
    method: "PUT",
    url: `${baseUrl}/api/client/${id}`,
    headers: headersJson,
    body,
    json: true,
  });
}
