import * as ts from 'typescript'
import { type FindNodeOptions } from 'src/base/nodeFinders/findNode'
import type { NodeTypeMap } from 'src/base/nodeMatch/nodeMatchType'
import { findNodes } from 'src/base/nodeFinders/findNodes'
import type { FindNodeTypeOptions } from 'src/base/nodeFinders/specifiedTypes/findOne/findNodeType'

export function findNodeTypes<TType extends ts.Node = ts.Node>(
  node: ts.Node,
  type: NodeTypeMap | keyof typeof NodeTypeMap,
  opt: FindNodeTypeOptions = {},
) {
  const findTypeOptions: FindNodeOptions = {
    ...opt,
    type,
  }
  return findNodes<TType>(node, findTypeOptions)
}
