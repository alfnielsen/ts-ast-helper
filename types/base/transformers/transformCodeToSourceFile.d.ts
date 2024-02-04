import * as ts from 'typescript';
export declare function transformCodeToSourceFile(code: string, ...transformer: ts.TransformerFactory<ts.SourceFile>[]): ts.SourceFile;
