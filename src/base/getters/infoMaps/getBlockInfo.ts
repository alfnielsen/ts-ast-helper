import * as ts from 'typescript'
import {
  getNodeInfo,
  type NodeInfo,
} from 'src/base/getters/infoMaps/getNodeInfo'
import {
  getStatementInfo,
  type StatementInfo,
} from 'src/base/getters/infoMaps/getStatementInfo'

export type BlockInfo = NodeInfo & {
  statements: StatementInfo[]
}

export function getBlockInfo(node: ts.Block) {
  const nodeInfo = getNodeInfo(node)
  var statements = node.statements.map(getStatementInfo)

  return {
    ...nodeInfo,
    statements,
  } satisfies BlockInfo
}
