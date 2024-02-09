import * as ts from 'typescript'
import { findNode } from 'src/base/nodeFinders/findNode'
import type { NodeTypeMap } from 'src/base/nodeMatch/match/nodeMatchType'
import type { FindNodeOptions } from 'src/base/nodeFinders/findNodes'

export type FindNodeTypeOptions = Omit<
  FindNodeOptions,
  'kind' | 'oneOfKinds' | 'type' | 'oneOfTypes'
> & {}

export function findNodeType<TType extends ts.Node = ts.Node>(
  node: ts.Node,
  type: NodeTypeMap | keyof typeof NodeTypeMap,
  opt: FindNodeTypeOptions = {},
) {
  const findTypeOptions: FindNodeOptions = {
    ...opt,
    type,
  }
  return findNode<TType>(node, findTypeOptions)
}
