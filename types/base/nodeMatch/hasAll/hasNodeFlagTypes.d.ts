import * as ts from 'typescript';
export declare const hasNodeFlagsType: (node: ts.Node, ...nodeFalgs: (ts.NodeFlags | keyof typeof ts.NodeFlags)[]) => boolean;
