import * as ts from 'typescript'
import { type FindNodeTypeOptions } from 'src/base/nodeFinders/findOne/findNodeType'
import { findNodeKinds } from 'src/base/nodeFinders/findMany/findNodeKinds'

export function findImports(rootNode: ts.Node, opt: FindNodeTypeOptions = {}) {
  return findNodeKinds<ts.ImportDeclaration>(rootNode, 'ImportDeclaration', opt)
}
