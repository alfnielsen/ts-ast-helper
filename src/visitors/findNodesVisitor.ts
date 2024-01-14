import * as ts from "typescript"
import { visitor } from "./visitor"

export function findNodesVisitor<TNode extends ts.Node = ts.Node>(
  root: ts.Node,
  nodeTest: (node: ts.Node, parent: ts.Node, ancestors: ts.Node[]) => undefined | boolean
): TNode[] {
  let foundNode: TNode[] = []
  visitor(root, (node, parent, ancestors) => {
    const hasFound = nodeTest(node, parent, ancestors)
    if (hasFound) {
      foundNode.push(node as TNode)
    }
  })
  return foundNode
}
