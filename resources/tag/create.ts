import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "Nome",
    name: "tagName",
    type: "string",
    required: true,
    displayOptions: { show: { resource: ["tag"], operation: ["create"] } },
    default: "",
    description: "Nome da etiqueta",
  },
  {
    displayName: "Cor",
    name: "tagColor",
    type: "color",
    displayOptions: { show: { resource: ["tag"], operation: ["create"] } },
    default: "#ffffff",
    description: "Cor da etiqueta",
  },
  {
    displayName: "Nome Completo",
    name: "tagFullname",
    type: "string",
    displayOptions: {
      show: { resource: ["tag"], operation: ["create", "update"] },
    },
    default: "",
    description: "Nome completo da etiqueta (opcional)",
  },
  {
    displayName: "Código",
    name: "tagCode",
    type: "string",
    displayOptions: {
      show: { resource: ["tag"], operation: ["create", "update"] },
    },
    default: "",
    description: "Código da etiqueta (opcional)",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  _headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const name = context.getNodeParameter("tagName", i) as string;
  const color = context.getNodeParameter("tagColor", i) as string;
  const fullname = context.getNodeParameter("tagFullname", i) as string;
  const code = context.getNodeParameter("tagCode", i) as string;
  const body: IDataObject = { name, color };
  if (fullname) body.fullname = fullname;
  if (code) body.code = code;
  return context.helpers.httpRequest({
    method: "POST",
    url: `${baseUrl}/api/client-tag`,
    headers: headersJson,
    body,
    json: true,
  });
}
