import * as ts from 'typescript'
import {
  findNodeType,
  type FindNodeTypeOptions,
} from 'src/base/nodeFinders/specifiedTypes/findOne/findNodeType'

export function findFunction(rootNode: ts.Node, opt: FindNodeTypeOptions = {}) {
  return findNodeType<ts.FunctionDeclaration>(rootNode, 'Function', opt)
}
