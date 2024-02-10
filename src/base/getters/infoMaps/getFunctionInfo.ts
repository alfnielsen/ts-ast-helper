import * as ts from 'typescript'
import { getModifierLikes } from 'src/base/getters/nodePropertyGetters/getModifierLikes'
import {
  getNodeInfo,
  type NodeInfo,
} from 'src/base/getters/infoMaps/getNodeInfo'
import { getIdentifierInfo } from 'src/base/getters/infoMaps/getIdentifierInfo'
import {
  getBlockInfo,
  type BlockInfo,
} from 'src/base/getters/infoMaps/getBlockInfo'
import {
  getParameterInfo,
  type ParameterInfo,
} from 'src/base/getters/infoMaps/getParameterInfo'
import type { StatementInfo } from 'src/base/getters/infoMaps/getStatementInfo'
import type { ModifierInfo } from 'src/base/getters/infoMaps/getModifierInfo'

export type FunctionInfo = NodeInfo & {
  name: string
  body: string
  modifiers: string[]
  parameterNames: string[]
  parameters: string[]
  // infos:
  nameInfo?: NodeInfo
  bodyInfo?: BlockInfo
  modifierInfos: ModifierInfo[]
  statementInfos: StatementInfo[]
  parameterInfos: ParameterInfo[]
}

export function getFunctionInfo(node: ts.FunctionDeclaration) {
  // infos
  const nodeInfo = getNodeInfo(node)
  const nameInfo = node.name ? getIdentifierInfo(node.name) : undefined
  const bodyInfo = node.body ? getBlockInfo(node.body) : undefined
  const parameterInfos = node.parameters.map(getParameterInfo)
  const statementInfos = bodyInfo?.statements ?? []
  const modifierInfos = node.modifiers?.map(getNodeInfo) ?? []
  // props
  const name = node.name?.getText() ?? ''
  const parameterNames = parameterInfos.map((p) => p.name)
  const parameters = parameterInfos.map((p) => p.text)
  const body = bodyInfo?.text ?? ''
  const modifiers = modifierInfos.map((m) => m.text)
  return {
    ...nodeInfo,
    name,
    body,
    modifiers,
    parameterNames,
    parameters,
    // infos
    nameInfo,
    bodyInfo,
    modifierInfos,
    statementInfos,
    parameterInfos,
  } satisfies FunctionInfo
}
