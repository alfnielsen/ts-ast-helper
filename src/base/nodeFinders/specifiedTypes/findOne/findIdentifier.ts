import * as ts from 'typescript'
import type { FindNodeOptions } from 'src/base/nodeFinders/findNode'
import { findNodeType } from 'src/base/nodeFinders/specifiedTypes/findOne/findNodeType'

export function findIdentifier(rootNode: ts.Node, opt: FindNodeOptions = {}) {
  return findNodeType<ts.Identifier>(rootNode, 'Identifier', opt)
}
