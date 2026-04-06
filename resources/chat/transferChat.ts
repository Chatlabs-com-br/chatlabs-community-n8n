import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";

export const fields: INodeProperties[] = [
  {
    displayName: "ID do Chat",
    name: "transferChatId",
    type: "string",
    required: true,
    displayOptions: {
      show: { resource: ["chat"], operation: ["transferChat"] },
    },
    default: "",
    description: "ID do chat a ser transferido",
  },
  {
    displayName: "Tipo de Transferência",
    name: "transferType",
    type: "options",
    required: true,
    displayOptions: {
      show: { resource: ["chat"], operation: ["transferChat"] },
    },
    options: [
      {
        name: "Para Atendente",
        value: "TRANSFER_TO_ATTENDANT",
        description: "Transfere para um atendente específico",
      },
      {
        name: "Para Departamento",
        value: "TRANSFER_TO_DEPARTMENT",
        description: "Transfere para a fila de um departamento",
      },
      {
        name: "Para Atendente Disponível",
        value: "TRANSFER_TO_AVAILABLE_ATTENDANT",
        description: "Busca automaticamente um atendente online no departamento",
      },
    ],
    default: "TRANSFER_TO_ATTENDANT",
    description: "Tipo de transferência a ser realizada",
  },
  {
    displayName: "ID do Atendente",
    name: "transferAttendantId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["chat"],
        operation: ["transferChat"],
        transferType: ["TRANSFER_TO_ATTENDANT"],
      },
    },
    default: "",
    description: "ID do atendente de destino",
  },
  {
    displayName: "ID do Departamento",
    name: "transferDepartmentId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["chat"],
        operation: ["transferChat"],
        transferType: ["TRANSFER_TO_DEPARTMENT"],
      },
    },
    default: "",
    description: "ID do departamento de destino",
  },
  {
    displayName: "ID do Departamento",
    name: "transferAvailableDeptId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["chat"],
        operation: ["transferChat"],
        transferType: ["TRANSFER_TO_AVAILABLE_ATTENDANT"],
      },
    },
    default: "",
    description: "Departamento onde buscar atendentes online",
  },
  {
    displayName: "IDs de Cargo (roleIds)",
    name: "transferRoleIds",
    type: "string",
    displayOptions: {
      show: {
        resource: ["chat"],
        operation: ["transferChat"],
        transferType: ["TRANSFER_TO_AVAILABLE_ATTENDANT"],
      },
    },
    default: "",
    placeholder: "1,2,3",
    description: "Filtra atendentes por cargo. Informe IDs separados por vírgula (opcional)",
  },
  {
    displayName: "Tipo do Fallback",
    name: "transferFallbackType",
    type: "options",
    displayOptions: {
      show: {
        resource: ["chat"],
        operation: ["transferChat"],
        transferType: ["TRANSFER_TO_AVAILABLE_ATTENDANT"],
      },
    },
    options: [
      { name: "Nenhum", value: "" },
      { name: "Departamento", value: "DEPARTMENT" },
      { name: "Atendente", value: "USER" },
    ],
    default: "",
    description: "Destino de fallback caso nenhum atendente esteja disponível (opcional)",
  },
  {
    displayName: "ID do Fallback",
    name: "transferFallbackId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["chat"],
        operation: ["transferChat"],
        transferType: ["TRANSFER_TO_AVAILABLE_ATTENDANT"],
        transferFallbackType: ["DEPARTMENT", "USER"],
      },
    },
    default: "",
    description: "ID do departamento ou atendente de fallback",
  },
  {
    displayName: "Enviar Mensagem de Transferência",
    name: "hasTransferMessage",
    type: "boolean",
    displayOptions: {
      show: { resource: ["chat"], operation: ["transferChat"] },
    },
    default: false,
    description: "Quando ativado, envia mensagem automática ao cliente informando a transferência",
  },
];

export async function execute(
  context: IExecuteFunctions,
  i: number,
  baseUrl: string,
  _headers: Record<string, string>,
  headersJson: Record<string, string>,
): Promise<IDataObject> {
  const chatId = context.getNodeParameter("transferChatId", i) as string;
  const transferType = context.getNodeParameter("transferType", i) as string;
  const hasTransferMessage = context.getNodeParameter("hasTransferMessage", i) as boolean;

  const body: IDataObject = { type: transferType, hasTransferMessage };

  if (transferType === "TRANSFER_TO_ATTENDANT") {
    body.attendantId = context.getNodeParameter("transferAttendantId", i) as string;
  } else if (transferType === "TRANSFER_TO_DEPARTMENT") {
    body.departmentId = context.getNodeParameter("transferDepartmentId", i) as string;
  } else if (transferType === "TRANSFER_TO_AVAILABLE_ATTENDANT") {
    const deptId = context.getNodeParameter("transferAvailableDeptId", i) as string;
    const roleIdsRaw = context.getNodeParameter("transferRoleIds", i) as string;
    const fallbackType = context.getNodeParameter("transferFallbackType", i) as string;

    const transferToAvailableAttendant: IDataObject = { departmentId: deptId };

    if (roleIdsRaw) {
      transferToAvailableAttendant.roleIds = roleIdsRaw
        .split(",")
        .map((r) => parseInt(r.trim(), 10))
        .filter((n) => !isNaN(n));
    }

    if (fallbackType) {
      const fallbackId = context.getNodeParameter("transferFallbackId", i) as string;
      transferToAvailableAttendant.fallback = { type: fallbackType, id: fallbackId };
    }

    body.transferToAvailableAttendant = transferToAvailableAttendant;
  }

  return context.helpers.httpRequest({
    method: "POST",
    url: `${baseUrl}/api/chat/${chatId}/transfer`,
    headers: headersJson,
    body,
    json: true,
  });
}
