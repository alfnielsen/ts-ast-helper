import * as ts from 'typescript'

export const nodeKinds = (...nodes: ts.Node[]) => {
  return nodes.map((node) => ts.SyntaxKind[node.kind])
}
