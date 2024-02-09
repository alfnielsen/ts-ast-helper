import * as ts from 'typescript'
import {
  nodeMatchOptions,
  type NodeMatchOptions,
} from 'src/base/nodeMatch/match/nodeMatchOptions'
import { findNodeVisitor } from 'src/base/visitors/findNodeVisitor'

export function findNode<TType extends ts.Node = ts.Node>(
  rootNode: ts.Node,
  opt: NodeMatchOptions = {},
) {
  return findNodeVisitor<TType>(rootNode, (node) => nodeMatchOptions(node, opt))
}
