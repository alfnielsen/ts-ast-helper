import * as ts from 'typescript';
export declare function nodeMatchKind(node: ts.Node, kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind): boolean;
