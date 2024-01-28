import * as ts from 'typescript'
import { visitor, type VisitorPredicateParamters } from './visitor'

export type FindNodeVisitorPredicateParamters = VisitorPredicateParamters

export type NodeTestPedicate = (
  node: ts.Node,
  parameters: FindNodeVisitorPredicateParamters,
) => undefined | boolean

export function findNodeVisitor<TNode extends ts.Node = ts.Node>(
  root: ts.Node,
  nodeTest: NodeTestPedicate,
): TNode | undefined {
  let foundNode: TNode | undefined
  visitor(root, (node, parameters) => {
    if (foundNode) {
      return
    }
    const hasFound = nodeTest(node, parameters)
    if (hasFound) {
      foundNode = node as TNode
    }
  })
  return foundNode
}
