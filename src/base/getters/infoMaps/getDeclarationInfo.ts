import * as ts from 'typescript'
import {
  getNodeInfo,
  type NodeInfo,
} from 'src/base/getters/infoMaps/getNodeInfo'

export type DeclarationInfo = NodeInfo & {}

export function getDeclarationInfo(node: ts.Declaration) {
  return getNodeInfo(node) satisfies DeclarationInfo
}
