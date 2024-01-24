import * as ts from 'typescript'

export function nodeMatchKind(
  node: ts.Node,
  kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind,
): boolean {
  return node.kind === ts.SyntaxKind[kind]
}
