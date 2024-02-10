import * as ts from 'typescript'
import {
  getNodeInfo,
  type NodeInfo,
} from 'src/base/getters/infoMaps/getNodeInfo'

export type StatementInfo = NodeInfo & {}

export function getStatementInfo(node: ts.Statement) {
  return {
    ...getNodeInfo(node),
  } satisfies StatementInfo
}
