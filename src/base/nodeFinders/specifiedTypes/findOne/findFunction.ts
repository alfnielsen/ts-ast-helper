import * as ts from 'typescript'
import {
  findNodeType,
  type FindNodeTypeOptions,
} from 'src/base/nodeFinders/specifiedTypes/findOne/findNodeType'

export type FindFunctionOptions = FindNodeTypeOptions

export function findFunction(rootNode: ts.Node, opt: FindFunctionOptions = {}) {
  return findNodeType<ts.FunctionDeclaration>(rootNode, 'Function', opt)
}
