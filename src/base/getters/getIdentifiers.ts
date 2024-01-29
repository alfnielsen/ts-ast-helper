import * as ts from 'typescript'

export const getIdentifiers = (node: ts.Node) => {
  const children = node.getChildren()
  const idenfifiers = children.filter(
    (child) => child.kind === ts.SyntaxKind.Identifier,
  ) as ts.Identifier[]
  return idenfifiers
}
