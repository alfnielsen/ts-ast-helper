import * as ts from 'typescript'
import { getExpressionInfo } from 'src/base/getters/infoMaps/getExpressionInfo'
import { type StatementInfo } from 'src/base/getters/infoMaps/getStatementInfo'
import {
  getTypeInfo,
  type TypeInfo,
} from 'src/base/getters/infoMaps/getTypeInfo'
import { hasNodeFlagType } from 'src/base/nodeMatch/has/hasNodeFlagType'
import { getNodeFlagNames } from 'src/base/getters/typeDefinitionGetters/getNodeFlagNames'

export type VariableDeclarationInfo = {
  text: string
  name: string
  start: number
  end: number
  kind: string
  flags: string[]
  exclamationMark: boolean
  type?: TypeInfo
  value?: StatementInfo
  async: boolean
  await: boolean
}

export function getVariableDeclarationInfo(node: ts.VariableDeclaration) {
  return {
    text: node.getText() ?? '',
    name: node.name?.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
    exclamationMark: !!node.exclamationToken,
    type: node.type ? getTypeInfo(node.type) : undefined,
    async: hasNodeFlagType(node, ts.NodeFlags.HasAsyncFunctions),
    await: hasNodeFlagType(node, ts.NodeFlags.AwaitUsing),
    flags: getNodeFlagNames(node.flags),
    value: node.initializer ? getExpressionInfo(node.initializer) : undefined,
  } satisfies VariableDeclarationInfo
}
