import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION } from "../utils";

const show = { resource: ["card"], operation: ["moveByContact"] };

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Contato",
    name: "cardMoveByContactContactId",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
    description: "UUID do contato no CRM",
  },
  {
    displayName: "ID da Etapa de Origem (Coluna)",
    name: "cardMoveByContactOriginColumnId",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
    description: "Move os cards do contato que estão nesta coluna",
  },
  {
    displayName: "ID da Etapa de Destino (Coluna)",
    name: "cardMoveByContactDestinationColumnId",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
  },
  {
    displayName: "Ordem",
    name: "cardMoveByContactOrder",
    type: "number",
    displayOptions: { show },
    default: 0,
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const body: IDataObject = {
    contact_id: context.getNodeParameter("cardMoveByContactContactId", i) as string,
    origin_column_id: context.getNodeParameter("cardMoveByContactOriginColumnId", i) as string,
    destination_column_id: context.getNodeParameter(
      "cardMoveByContactDestinationColumnId",
      i,
    ) as string,
    order: context.getNodeParameter("cardMoveByContactOrder", i) as number,
  };
  return context.helpers.httpRequest({
    method: "PUT",
    url: `${baseUrl}${INTEGRATION}/chatlabs/card/move`,
    headers: headersJson,
    body,
    json: true,
  });
}
