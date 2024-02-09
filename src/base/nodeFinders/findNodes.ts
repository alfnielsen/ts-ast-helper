import * as ts from 'typescript'
import {
  nodeMatchOptions,
  type NodeMatchOptions,
} from 'src/base/nodeMatch/match/nodeMatchOptions'
import { findNodesVisitor } from 'src/base/visitors/findNodesVisitor'

export type FindNodeOptions = NodeMatchOptions

export function findNodes<TType extends ts.Node = ts.Node>(
  rootNode: ts.Node,
  opt: FindNodeOptions = {},
) {
  return findNodesVisitor<TType>(rootNode, (node) =>
    nodeMatchOptions(node, opt),
  )
}
