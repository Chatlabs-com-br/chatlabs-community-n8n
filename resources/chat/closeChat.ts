import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Chat",
    name: "closeChatId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["chat"], operation: ["closeChat"] },
    },
    default: "",
    description: "ID do chat a ser encerrado",
  },
  {
    displayName: "Enviar Avaliação ao Cliente",
    name: "sendFeedbackToCustomer",
    type: "boolean",
    displayOptions: {
      show: { resource: ["chat"], operation: ["closeChat"] },
    },
    default: false,
    description: "Envia avaliação de atendimento ao cliente ao encerrar",
  },
  {
    displayName: "Enviar Mensagem Final",
    name: "sendFinalMessage",
    type: "boolean",
    displayOptions: {
      show: { resource: ["chat"], operation: ["closeChat"] },
    },
    default: false,
    description: "Envia a mensagem de encerramento configurada na empresa ao cliente",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  _headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const chatId = context.getNodeParameter("closeChatId", i) as string;
  const sendFeedbackToCustomer = context.getNodeParameter("sendFeedbackToCustomer", i) as boolean;
  const sendFinalMessage = context.getNodeParameter("sendFinalMessage", i) as boolean;
  const body: IDataObject = { sendFeedbackToCustomer, sendFinalMessage };
  return context.helpers.httpRequest({
    method: "POST",
    url: `${baseUrl}/api/chat/${chatId}/close`,
    headers: headersJson,
    body,
    json: true,
  });
}
