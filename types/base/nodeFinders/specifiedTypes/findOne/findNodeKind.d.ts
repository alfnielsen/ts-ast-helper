import * as ts from 'typescript';
import { type FindNodeOptions } from 'src/base/nodeFinders/findNode';
export declare type FindNodeKindOptions = Omit<FindNodeOptions, 'kind' | 'oneOfKinds' | 'type' | 'oneOfTypes'> & {
    isVariableDeclaration?: true;
};
export declare function findNodeKind<TType extends ts.Node = ts.Node>(node: ts.Node, kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind, opt?: FindNodeKindOptions): any;
