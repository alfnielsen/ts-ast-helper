import * as ts from "typescript"
import { visitor } from "./visitor"

export function findNodeVisitor(
  root: ts.Node,
  nodeTest: (node: ts.Node, parent: ts.Node, ancestors: ts.Node[]) => boolean
) {
  let foundNode: ts.Node | undefined
  visitor(root, (node, parent, ancestors) => {
    const hasFound = nodeTest(node, parent, ancestors)
    if (hasFound) {
      foundNode = node
    }
  })
  return foundNode
}
