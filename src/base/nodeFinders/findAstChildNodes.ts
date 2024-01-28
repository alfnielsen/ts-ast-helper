import * as ts from 'typescript'
import {
  nodeMatchOptions,
  type NodeMatchOptions,
} from 'src/base/nodeFinders/nodeMatchOptions'
import { getAstChildren } from 'src/base/nodeProperties/getAstChildren'

export type FindNodeOptions = NodeMatchOptions
/**
 * Find all of node's Ast children matching the match options. \
 * The children list comes from getAstChildren \
 * (witch return the children from ts.forEachChild, not the node.getChildren)
 * @param parentNode
 * @param opt
 * @returns
 */
export function findAstChildNode<TType extends ts.Node = ts.Node>(
  parentNode: ts.Node,
  opt: NodeMatchOptions = {},
) {
  return getAstChildren(parentNode).filter((child) =>
    nodeMatchOptions(child, opt),
  ) as TType[]
}
