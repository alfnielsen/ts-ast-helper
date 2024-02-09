import * as ts from 'typescript'
import { isExported } from 'src/base/nodeMatch/is/isExported'
import { hasNodeFlagType } from 'src/base/nodeMatch/has/hasNodeFlagType'
import { isDefaultExported } from 'src/base/nodeMatch/is/isDefaultExported'
import {
  getVariableDeclarationInfo,
  type VariableDeclarationInfo,
} from './getVariableDeclarationInfo'

export type VariableDeclarationListInfo = {
  text: string
  start: number
  end: number
  kind: string
  declarations: VariableDeclarationInfo[]
  flags: number
  export: boolean
  defaultExport: boolean
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
    flags: node.flags,
    export: isExported(node),
    defaultExport: isDefaultExported(node),
    var: isVar,
    let: isLet,
    const: isConst,
    declarationType,
    declarations: node.declarations.map(getVariableDeclarationInfo),
  } satisfies VariableDeclarationListInfo
}
