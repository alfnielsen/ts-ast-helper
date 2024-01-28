import * as ts from 'typescript'
import { type FindNodeTypeOptions } from 'src/base/nodeFinders/specifiedTypes/findOne/findNodeType'
import { findNodeTypes } from 'src/base/nodeFinders/specifiedTypes/findMany/findNodeTypes'

export type FindFunctionOptions = FindNodeTypeOptions

export function findFunctions(
  rootNode: ts.Node,
  opt: FindFunctionOptions = {},
) {
  return findNodeTypes<ts.FunctionDeclaration>(rootNode, 'Function', opt)
}
