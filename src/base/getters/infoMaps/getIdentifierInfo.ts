import * as ts from 'typescript'
import {
  getNodeInfo,
  type NodeInfo,
} from 'src/base/getters/infoMaps/getNodeInfo'

export type IdentifierInfo = NodeInfo & {
  name: string
}

export function getIdentifierInfo(node: ts.Identifier) {
  const nodeInfo = getNodeInfo(node)
  return {
    ...nodeInfo,
    name: nodeInfo.text,
  } satisfies IdentifierInfo
}
