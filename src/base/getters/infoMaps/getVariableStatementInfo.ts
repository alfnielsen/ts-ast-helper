import * as ts from 'typescript'
import { isExported } from 'src/base/nodeMatch/is/isExported'
import { isDefaultExported } from 'src/base/nodeMatch/is/isDefaultExported'
import {
  getVariableDeclarationListInfo,
  type VariableDeclarationListInfo,
} from 'src/base/getters/infoMaps/getVariableDeclarationListInfo'

export type VariableStatementInfo = {
  text: string
  start: number
  end: number
  kind: string
  declarationList: VariableDeclarationListInfo
  flags: string[]
  export: boolean
  defaultExport: boolean
}

export function getVariableStatementInfo(node: ts.VariableStatement) {
  ts.isArrowFunction
  node.modifiers
  return {
    text: node.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
    declarationList: getVariableDeclarationListInfo(node.declarationList),
    flags: node.flags.toString().split(' '),
    export: isExported(node),
    defaultExport: isDefaultExported(node),
  } satisfies VariableStatementInfo
}
