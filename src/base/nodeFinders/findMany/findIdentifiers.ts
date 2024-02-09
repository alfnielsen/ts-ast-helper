import * as ts from 'typescript'
import { findNodeTypes } from 'src/base/nodeFinders/findMany/findNodeTypes'
import type { FindNodeOptions } from 'src/base/nodeFinders/findNodes'

export function findIdentifiers(rootNode: ts.Node, opt: FindNodeOptions = {}) {
  return findNodeTypes<ts.Identifier>(rootNode, 'Identifier', opt)
}
