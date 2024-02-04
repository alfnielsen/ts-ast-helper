import * as ts from 'typescript';
export declare function transformNode<TNode extends ts.Node = ts.Node>(node: TNode, ...transformer: ts.TransformerFactory<TNode>[]): TNode;
