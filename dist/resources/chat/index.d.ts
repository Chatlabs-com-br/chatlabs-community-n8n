import { IExecuteFunctions, INodeProperties, IDataObject } from "n8n-workflow";
export declare const operationOptions: INodeProperties;
export declare const fields: INodeProperties[];
export declare function execute(context: IExecuteFunctions, i: number, operation: string, baseUrl: string, headers: Record<string, string>, headersJson: Record<string, string>): Promise<IDataObject>;
//# sourceMappingURL=index.d.ts.map