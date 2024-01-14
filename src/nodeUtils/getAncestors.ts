import * as ts from "typescript"

export function getAncestors(node: ts.Node) {
  const ancestors: ts.Node[] = []
  let parent = node.parent
  while (parent) {
    ancestors.push(parent)
    parent = parent.parent
  }
  return ancestors
}
