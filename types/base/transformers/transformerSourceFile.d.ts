import * as ts from 'typescript';
export declare function transformerSourceFile(context: ts.TransformationContext, predicate: (node: ts.Node, parent: ts.Node, ancestors: ts.Node[]) => ts.Node | undefined): (node: ts.SourceFile) => ts.SourceFile;
