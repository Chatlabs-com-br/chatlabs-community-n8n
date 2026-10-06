import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

const operations = ["addTag", "removeTag"];

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Cliente",
    name: "tagClientId",
    type: "string",
    required: true,
    displayOptions: { show: { resource: ["client"], operation: operations } },
    default: "",
    description: "ID do cliente que receberá ou perderá a etiqueta",
  },
  {
    displayName: "Identificar Etiqueta Por",
    name: "clientTagBy",
    type: "options",
    displayOptions: { show: { resource: ["client"], operation: operations } },
    options: [
      { name: "Nome", value: "name" },
      { name: "ID", value: "id" },
    ],
    default: "name",
    description: "Como localizar a etiqueta",
  },
  {
    displayName: "Etiqueta",
    name: "clientTagValue",
    type: "string",
    required: true,
    displayOptions: { show: { resource: ["client"], operation: operations } },
    default: "",
    description:
      "Nome ou ID da etiqueta. Se ela não existir, a saída traz tagNotFound: true em vez de erro",
  },
];

function safeStringify(value: unknown): string {
  const seen = new WeakSet<object>();
  try {
    return JSON.stringify(value, (_key, v) => {
      if (typeof v === "object" && v !== null) {
        if (seen.has(v)) return undefined;
        seen.add(v);
      }
      return v;
    });
  } catch {
    return "";
  }
}

function isTagNotFound(error: unknown): boolean {
  const e = error as Record<string, unknown> | undefined;
  const text = [e?.message, e?.description, safeStringify(e)]
    .filter((p): p is string => typeof p === "string")
    .join(" ");
  return text.includes("CLIENT_TAG__NOT_FOUND");
}

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  _headers: Record<string, string>,
  headersJson: Record<string, string>,
  action: "add-tag" | "remove-tag",
): Promise<IDataObject> {
  const clientId = context.getNodeParameter("tagClientId", i) as string;
  const by = context.getNodeParameter("clientTagBy", i) as string;
  const value = context.getNodeParameter("clientTagValue", i) as string;

  const body: IDataObject = by === "id" ? { tagId: value } : { tagName: value };

  try {
    return await context.helpers.httpRequest({
      method: "POST",
      url: `${baseUrl}/api/client/${clientId}/${action}`,
      headers: headersJson,
      body,
      json: true,
    });
  } catch (error) {
    if (isTagNotFound(error)) {
      return { tagNotFound: true, clientId, [by === "id" ? "tagId" : "tagName"]: value };
    }
    throw error;
  }
}
