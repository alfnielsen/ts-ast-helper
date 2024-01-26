import {
  nodeMatchOptions,
  type NodeMatchOptions,
} from 'src/base/nodeFinders/nodeMatchOptions'
import { findNodeVisitor } from 'src/base/visitors/findNodeVisitor'
import * as ts from 'typescript'

export type FindNodeOptions = NodeMatchOptions

export function findFunction(rootNode: ts.Node, opt: NodeMatchOptions = {}) {
  return findNodeVisitor<ts.FunctionDeclaration>(rootNode, (node) =>
    nodeMatchOptions(node, opt),
  )
}
