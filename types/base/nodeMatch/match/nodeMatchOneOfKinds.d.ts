import * as ts from 'typescript';
export declare function nodeMatchOneOfKinds(node: ts.Node, ...kinds: (ts.SyntaxKind | keyof typeof ts.SyntaxKind)[]): boolean;
