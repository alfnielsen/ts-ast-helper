import * as ts from "typescript"
import { visitor } from "./visitor"

export function findNodeVisitor<TNode extends ts.Node = ts.Node>(
  root: ts.Node,
  nodeTest: (node: ts.Node, parent: ts.Node, ancestors: ts.Node[]) => undefined | boolean
): TNode | undefined {
  let foundNode: TNode | undefined
  visitor(root, (node, parent, ancestors) => {
    if (foundNode) {
      return
    }
    const hasFound = nodeTest(node, parent, ancestors)
    if (hasFound) {
      foundNode = node as TNode
    }
  })
  return foundNode
}
