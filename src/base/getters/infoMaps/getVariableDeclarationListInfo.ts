import * as ts from 'typescript'
import { hasNodeFlagType } from 'src/base/nodeMatch/has/hasNodeFlagType'
import {
  getVariableDeclarationInfo,
  type VariableDeclarationInfo,
} from './getVariableDeclarationInfo'
import { getNodeFlagNames } from 'src/base/getters/typeDefinitionGetters/getNodeFlagNames'

export type VariableDeclarationListInfo = {
  text: string
  start: number
  end: number
  kind: string
  declarations: VariableDeclarationInfo[]
  flags: string[]
  var: boolean
  let: boolean
  const: boolean
  declarationType: 'const' | 'let' | 'var'
}

export function getVariableDeclarationListInfo(
  node: ts.VariableDeclarationList,
) {
  const isConst = hasNodeFlagType(node, ts.NodeFlags.Const)
  const isLet = hasNodeFlagType(node, ts.NodeFlags.Let)
  const isVar = !isConst && !isLet
  const declarationType = isConst ? 'const' : isLet ? 'let' : 'var'

  return {
    text: node.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
    flags: getNodeFlagNames(node.flags),
    var: isVar,
    let: isLet,
    const: isConst,
    declarationType,
    declarations: node.declarations.map(getVariableDeclarationInfo),
  } satisfies VariableDeclarationListInfo
}
