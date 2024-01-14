import * as ts from "typescript"
import { getChildren } from "./getChildren"

export const getIdentifier = (node: ts.Node): ts.Identifier | undefined => {
  const children = getChildren(node)
  const idenfifier = children.find(child => child.kind === ts.SyntaxKind.Identifier) as ts.Identifier | undefined
  return idenfifier
}
