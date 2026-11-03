import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Chat",
    name: "typingIndicatorChatId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["chat"], operation: ["sendTypingIndicator"] },
    },
    default: "",
    description: "ID do chat onde o indicador será exibido",
  },
  {
    displayName: "Tipo",
    name: "typingIndicatorType",
    type: "options",
    displayOptions: {
      show: { resource: ["chat"], operation: ["sendTypingIndicator"] },
    },
    options: [
      { name: "Digitando", value: "TEXT" },
      { name: "Gravando Áudio", value: "AUDIO" },
    ],
    default: "TEXT",
    description:
      'Só WhatsApp API oficial. Some após 25s ou no envio da próxima mensagem. A API oficial não tem "gravando", então AUDIO aparece como "digitando..."',
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  _headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const chatId = context.getNodeParameter("typingIndicatorChatId", i) as string;
  const type = context.getNodeParameter("typingIndicatorType", i) as string;
  return context.helpers.httpRequest({
    method: "POST",
    url: `${baseUrl}/api/chat/${chatId}/typing-indicator`,
    headers: headersJson,
    body: { type },
    json: true,
  });
}
