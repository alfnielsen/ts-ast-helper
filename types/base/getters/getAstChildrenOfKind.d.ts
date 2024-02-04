import * as ts from 'typescript';
export declare function getAstChildrenOfKind<TType extends ts.Node = ts.Node>(parent: ts.Node, kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind): TType[];
