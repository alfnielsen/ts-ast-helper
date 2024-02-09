import type { VariableDeclarationInfo } from 'src/base/getters/infoMaps/getVariableDeclarationInfo'
import type { VariableDeclarationListInfo } from 'src/base/getters/infoMaps/getVariableDeclarationListInfo'
import { getVariableStatementInfo } from 'src/base/getters/infoMaps/getVariableStatementInfo'
import { getNodeFlagNames } from 'src/base/getters/typeDefinitionGetters/getNodeFlagNames'
import * as ts from 'typescript'

export type VariableInfo = {
  text: string
  start: number
  end: number
  kind: string
  export: boolean
  async: boolean
  await: boolean
  flags: string[]
  variableDeclarationListInfo: VariableDeclarationListInfo
  variableDeclarationInfo: VariableDeclarationInfo
}

/**
 * Take a VariableStatement and return a VariableInfo \
 * Expect a single Variable Declaration \
 * Include modifers, flags ect. from the VariableStatement, VariableDeclarationList, and VariableDeclaration
 * @param node
 * @returns
 */
export function getVariableInfo(node: ts.VariableStatement) {
  const info = getVariableStatementInfo(node)
  const listDeclInfo = info.declarationList
  const list = listDeclInfo.declarations
  if (list.length !== 1) {
    throw new Error('Expected a single declaration')
  }
  const flags = getNodeFlagNames(node.flags)
  const declInfo = list[0]
  const allFlags = [
    ...new Set([flags, listDeclInfo.flags, declInfo.flags].flat()),
  ]
  return {
    text: node.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
    export: info.export,
    async: declInfo.async,
    await: declInfo.await,
    flags: allFlags,
    variableDeclarationListInfo: listDeclInfo,
    variableDeclarationInfo: declInfo,
  } satisfies VariableInfo
}
