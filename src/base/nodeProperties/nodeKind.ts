import * as ts from 'typescript'

export const nodeKind = (node: ts.Node) => {
  return ts.SyntaxKind[node.kind]
}
