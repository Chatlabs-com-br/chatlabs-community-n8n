import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
import { INTEGRATION, compact } from "../utils";

const show = { resource: ["card"], operation: ["move"] };

// cardId é compartilhado com get.ts
export const fields: INodeProperties[] = [
  {
    displayName: "ID da Etapa de Destino (Coluna)",
    name: "cardMoveColumnId",
    type: "string",
    required: true,
    displayOptions: { show },
    default: "",
  },
  {
    displayName: "Ordem",
    name: "cardMoveOrder",
    type: "number",
    displayOptions: { show },
    default: 0,
    description: "Posição do card na coluna de destino",
  },
  {
    displayName: "Campos Adicionais",
    name: "cardMoveAdditional",
    type: "collection",
    placeholder: "Adicionar campo",
    displayOptions: { show },
    default: {},
    options: [
      {
        displayName: "ID do Motivo de Perda",
        name: "loss_reason_id",
        type: "string",
        default: "",
      },
      {
        displayName: "Observação da Perda",
        name: "loss_reason_note",
        type: "string",
        default: "",
      },
    ],
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const id = context.getNodeParameter("cardId", i) as string;
  const additional = context.getNodeParameter("cardMoveAdditional", i, {}) as IDataObject;
  const body = compact({
    ...additional,
    column_id: context.getNodeParameter("cardMoveColumnId", i) as string,
    order: context.getNodeParameter("cardMoveOrder", i) as number,
  });
  return context.helpers.httpRequest({
    method: "PUT",
    url: `${baseUrl}${INTEGRATION}/card/move/${id}`,
    headers: headersJson,
    body,
    json: true,
  });
}
