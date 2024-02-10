import {
  getNodeInfo,
  type NodeInfo,
} from 'src/base/getters/infoMaps/getNodeInfo'
import * as ts from 'typescript'

export type ExpressionInfo = NodeInfo & {}

export function getExpressionInfo(
  node: ts.Expression | ts.ExpressionStatement,
) {
  if (ts.isExpressionStatement(node)) {
    node = node.expression
  }
  return getNodeInfo(node) satisfies ExpressionInfo
}
