import * as ts from 'typescript'
import { visitor, type VisitorPredicateParamters } from './visitor'
import type { NodeTestPedicate } from 'src/base/visitors/findNodeVisitor'

export type FindNodesVisitorPredicateParamters = VisitorPredicateParamters

export function findNodesVisitor<TNode extends ts.Node = ts.Node>(
  root: ts.Node,
  nodeTest: NodeTestPedicate,
): TNode[] {
  let foundNode: TNode[] = []
  visitor(root, (node, parameters) => {
    const hasFound = nodeTest(node, parameters)
    if (hasFound) {
      foundNode.push(node as TNode)
    }
  })
  return foundNode
}
