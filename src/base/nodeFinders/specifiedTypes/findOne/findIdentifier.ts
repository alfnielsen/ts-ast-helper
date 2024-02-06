import * as ts from 'typescript'
import { findNodeType } from 'src/base/nodeFinders/specifiedTypes/findOne/findNodeType'
import type { FindNodeOptions } from 'src/base/nodeFinders/findNodes'

export function findIdentifier(rootNode: ts.Node, opt: FindNodeOptions = {}) {
  return findNodeType<ts.Identifier>(rootNode, 'Identifier', opt)
}
