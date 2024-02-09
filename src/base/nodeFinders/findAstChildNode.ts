import * as ts from 'typescript'
import {
  nodeMatchOptions,
  type NodeMatchOptions,
} from 'src/base/nodeMatch/match/nodeMatchOptions'
import { getAstChildren } from 'src/base/getters/nodePropertyGetters/getAstChildren'

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
