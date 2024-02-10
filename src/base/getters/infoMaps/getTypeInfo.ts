import * as ts from 'typescript'
import {
  getNodeInfo,
  type NodeInfo,
} from 'src/base/getters/infoMaps/getNodeInfo'

export type TypeInfo = NodeInfo & {}

export function getTypeInfo(node: ts.TypeNode) {
  return {
    ...getNodeInfo(node),
  } satisfies TypeInfo
}
