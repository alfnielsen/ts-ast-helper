import * as ts from 'typescript'
import { findNode, type FindNodeOptions } from 'src/base/nodeFinders/findNode'
import type { NodeTypeMap } from 'src/base/nodeMatch/nodeMatchType'

export type FindNodeTypeOptions = Omit<
  FindNodeOptions,
  'kind' | 'oneOfKinds' | 'type' | 'oneOfTypes'
> & {
  isVariableDeclaration?: true
}

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
