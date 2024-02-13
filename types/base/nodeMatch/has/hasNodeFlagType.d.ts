import * as ts from 'typescript';
export declare const hasNodeFlagType: (node: ts.Node, nodeFalg: ts.NodeFlags | keyof typeof ts.NodeFlags) => boolean;
