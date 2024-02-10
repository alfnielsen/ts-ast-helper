import {
  getNodeInfo,
  type NodeInfo,
} from 'src/base/getters/infoMaps/getNodeInfo'
import * as ts from 'typescript'

export type ModifierInfo = NodeInfo & {}

export function getModifierInfo(node: ts.ModifierLike) {
  return getNodeInfo(node) satisfies ModifierInfo
}
