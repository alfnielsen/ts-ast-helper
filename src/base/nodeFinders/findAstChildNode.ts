import * as ts from 'typescript'
import {
  nodeMatchOptions,
  type NodeMatchOptions,
} from 'src/base/nodeFinders/nodeMatchOptions'
import { getAstChildren } from 'src/base/nodeProperties/getAstChildren'

export type FindNodeOptions = NodeMatchOptions
/**
 * Find first of node's Ast child matching the match options. \
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
  return getAstChildren(parentNode).find((child) =>
    nodeMatchOptions(child, opt),
  ) as TType | undefined
}
