import * as ts from 'typescript';
export declare function findNodeInStringVisitor<TNode extends ts.Node = ts.Node>(code: string, nodeTest: (node: ts.Node, parent: ts.Node, ancestors: ts.Node[]) => undefined | boolean): TNode | undefined;
