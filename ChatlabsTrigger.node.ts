import {
  IWebhookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
  IDataObject,
} from "n8n-workflow";

export class ChatlabsTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Chatlabs Trigger",
    name: "chatlabsTrigger",
    icon: "file:chatlabs.png",
    group: ["trigger"],
    version: 1,
    description: "Inicia um fluxo quando o Chatlabs dispara um evento via Bot Action",
    defaults: {
      name: "Chatlabs Trigger",
    },
    inputs: [],
    outputs: ["main"],
    webhooks: [
      {
        name: "default",
        httpMethod: "POST",
        responseMode: "onReceived",
        path: "chatlabs-trigger",
      },
    ],
    properties: [
      {
        displayName: "Cole esta URL na Bot Action do Chatlabs",
        name: "webhookNotice",
        type: "notice",
        default: "",
      },
    ],
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const body = this.getBodyData();
    const headers = this.getHeaderData();

    // Transferência vinda de bloco de ação: o texto é a opção clicada no menu,
    // não uma mensagem real do cliente. Move para actionOption e limpa o texto.
    const message = body.message as IDataObject | undefined;
    const quoted = message?.quotedMessage as IDataObject | undefined;
    const fromActionBlock =
      body.event === "TRANSFER" &&
      message?.type === "INTERACTIVE" &&
      quoted?.sender === "Bot";

    body.fromActionBlock = fromActionBlock;
    if (fromActionBlock && message) {
      message.actionOption = message.text;
      message.text = "";
    }
    const query = this.getQueryData();

    // Campos prontos para mapear no fluxo, sem expressão longa em cima do body.
    const client = body.client as IDataObject | undefined;
    const attendant = body.attendant as IDataObject | undefined;
    const file = message?.file as IDataObject | undefined;
    const interactive = message?.interactive as IDataObject | undefined;
    const replyTitle = (reply: unknown) =>
      (reply as IDataObject | undefined)?.title as string | undefined;
    // Vindo de bloco de ação, a opção clicada fica só em actionOption.
    const text = fromActionBlock
      ? ""
      : (message?.text as string | undefined) ||
        replyTitle(interactive?.button_reply) ||
        replyTitle(interactive?.list_reply) ||
        replyTitle(message?.button_reply) ||
        replyTitle(message?.list_reply) ||
        "";

    const data: IDataObject = {
      event: String(body.event ?? "").toUpperCase(),
      chatId: String(body.chatId ?? ""),
      companyId: Number(body.companyId ?? 0),
      attendantId: String(attendant?.id ?? ""),
      clientName: String(client?.name ?? ""),
      clientPhone: String(client?.phone ?? ""),
      text: String(text).trim(),
      actionOption: String(message?.actionOption ?? ""),
      messageType: String(message?.type ?? "TEXT").toUpperCase(),
      fileUrl: String(file?.url ?? ""),
      fromActionBlock,
      body,
      headers,
      query,
    };

    return {
      workflowData: [[{ json: data }]],
    };
  }
}
