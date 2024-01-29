import * as ts from "typescript"

export const getIdentifier = (node: ts.Node): ts.Identifier | undefined => {
  const children = node.getChildren()
  const idenfifier = children.find(child => child.kind === ts.SyntaxKind.Identifier) as ts.Identifier | undefined
  return idenfifier
}
