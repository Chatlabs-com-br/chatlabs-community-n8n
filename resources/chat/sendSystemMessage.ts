import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Chat",
    name: "sendSystemMessageChatId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["chat"], operation: ["sendSystemMessage"] },
    },
    default: "",
    description: "ID do chat para registrar a mensagem de sistema",
  },
  {
    displayName: "Texto",
    name: "sendSystemMessageText",
    type: "string",
    required: true,
    typeOptions: { rows: 4 },
    displayOptions: {
      show: { resource: ["chat"], operation: ["sendSystemMessage"] },
    },
    default: "",
    description:
      "Texto da mensagem de sistema, por exemplo um aviso de que uma API externa está fora do ar",
  },
  {
    displayName: "ID do Atendente",
    name: "sendSystemMessageAttendantId",
    type: "string",
    displayOptions: {
      show: { resource: ["chat"], operation: ["sendSystemMessage"] },
    },
    default: "",
    description: "ID do atendente associado à mensagem (opcional)",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  _headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const chatId = context.getNodeParameter("sendSystemMessageChatId", i) as string;
  const text = context.getNodeParameter("sendSystemMessageText", i) as string;
  const attendantId = context.getNodeParameter("sendSystemMessageAttendantId", i) as string;

  const body: IDataObject = { text, subject: "SYSTEM" };
  if (attendantId) body.attendantId = attendantId;

  return context.helpers.httpRequest({
    method: "POST",
    url: `${baseUrl}/api/chat/${chatId}/message`,
    headers: headersJson,
    body,
    json: true,
  });
}
