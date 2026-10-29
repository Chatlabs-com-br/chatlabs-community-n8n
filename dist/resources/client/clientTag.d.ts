import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
export declare const fields: INodeProperties[];
export declare function execute(context: IExecuteFunctions, i: number, baseUrl: string, headers: Record<string, string>, headersJson: Record<string, string>, action: "add-tag" | "remove-tag"): Promise<IDataObject>;
//# sourceMappingURL=clientTag.d.ts.map