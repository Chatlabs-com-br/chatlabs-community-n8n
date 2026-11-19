import { IDataObject } from "n8n-workflow";

export const INTEGRATION = "/api/integration";

export function csv(value: unknown): string[] {
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

// Remove chaves vazias para não sobrescrever dados no CRM com "".
export function compact(obj: IDataObject): IDataObject {
  const out: IDataObject = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    out[k] = v;
  }
  return out;
}

export const priorityOptions = [
  { name: "Baixa", value: "LOW" },
  { name: "Normal", value: "NORMAL" },
  { name: "Alta", value: "HIGH" },
  { name: "Urgente", value: "URGENT" },
];
