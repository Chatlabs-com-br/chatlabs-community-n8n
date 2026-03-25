import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "Por Página",
    name: "perPage",
    type: "number",
    displayOptions: {
      show: { resource: ["attendant"], operation: ["list"] },
    },
    typeOptions: { minValue: 1, maxValue: 100 },
    default: 10,
    description: "Número de atendentes por página",
  },
  {
    displayName: "Campo de Pesquisa",
    name: "field",
    type: "options",
    displayOptions: {
      show: { resource: ["attendant"], operation: ["list"] },
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
        resource: ["attendant"],
        operation: ["list"],
        field: ["FULLNAME", "EMAIL"],
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
  const field = context.getNodeParameter("field", i) as string;
  const searchValue = field
    ? (context.getNodeParameter("searchValue", i) as string)
    : "";
  const qs: IDataObject = { perPage };
  if (field && searchValue) {
    qs.field = field;
    qs.value = searchValue;
  }
  return context.helpers.httpRequest({
    method: "GET",
    url: `${baseUrl}/api/attendant`,
    headers,
    qs,
    json: true,
  });
}
