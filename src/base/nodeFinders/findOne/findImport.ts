import * as ts from 'typescript'
import { type FindNodeTypeOptions } from 'src/base/nodeFinders/findOne/findNodeType'
import { findNodeKind } from 'src/base'

export function findImport(rootNode: ts.Node, opt: FindNodeTypeOptions = {}) {
  return findNodeKind<ts.ImportDeclaration>(rootNode, 'ImportDeclaration', opt)
}
