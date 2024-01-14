import * as ts from "typescript"

export function getChildren(node: ts.Node) {
  const children: ts.Node[] = []
  ts.forEachChild(node, child => children.push(child))
  return children
}
