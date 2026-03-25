import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "Por Página",
    name: "perPage",
    type: "number",
    displayOptions: { show: { resource: ["client"], operation: ["list"] } },
    typeOptions: { minValue: 1, maxValue: 100 },
    default: 10,
    description: "Número de clientes por página",
  },
  {
    displayName: "Campo de Pesquisa",
    name: "clientField",
    type: "options",
    displayOptions: { show: { resource: ["client"], operation: ["list"] } },
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
        resource: ["client"],
        operation: ["list"],
        clientField: ["NAME", "EMAIL", "IDENTIFICATION", "PHONE", "TAGS"],
      },
    },
    default: "",
    description: "Valor a ser pesquisado",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headers: Record<string, string>,
): Promise<IDataObject> {
  const perPage = context.getNodeParameter("perPage", i) as number;
  const field = context.getNodeParameter("clientField", i) as string;
  const searchValue = field
    ? (context.getNodeParameter("clientSearchValue", i) as string)
    : "";
  const qs: IDataObject = { perPage };
  if (field && searchValue) {
    qs.field = field;
    qs.value = searchValue;
  }
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}/api/client`,
    headers,
    qs,
    json: true,
  });
}
