import * as ts from 'typescript';
export declare function transformCode(code: string, ...transformer: ts.TransformerFactory<ts.SourceFile>[]): string;
