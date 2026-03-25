import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "Nome",
    name: "tagName",
    type: "string",
    displayOptions: { show: { resource: ["tag"], operation: ["update"] } },
    default: "",
    description: "Nome da etiqueta (opcional)",
  },
  {
    displayName: "Cor",
    name: "tagColor",
    type: "color",
    displayOptions: { show: { resource: ["tag"], operation: ["update"] } },
    default: "#ffffff",
    description: "Cor da etiqueta (opcional)",
  },
];
// tagId is shared with get.ts; tagFullname, tagCode shared with create.ts

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  _headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("tagId", i) as string;
  const name = context.getNodeParameter("tagName", i) as string;
  const color = context.getNodeParameter("tagColor", i) as string;
  const fullname = context.getNodeParameter("tagFullname", i) as string;
  const code = context.getNodeParameter("tagCode", i) as string;
  const body: IDataObject = {};
  if (name) body.name = name;
  if (color) body.color = color;
  if (fullname) body.fullname = fullname;
  if (code) body.code = code;
  return context.helpers.httpRequest({
    method: "PATCH",
    url: `${baseUrl}/api/client-tag/${id}`,
    headers: headersJson,
    body,
    json: true,
  });
}
