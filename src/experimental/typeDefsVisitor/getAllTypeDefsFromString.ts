import * as ts from 'typescript'
import { findNodesInCode, getName } from 'src/base'

export type GetAllTypeDefsFromString = {
  content: string
}

export function getAllTypeDefsFromString(opt: GetAllTypeDefsFromString) {
  const { content } = opt
  // collect all type definations:
  const typeDeclarations = findNodesInCode<ts.Node>(content, {
    oneOfKinds: [
      'TypeAliasDeclaration',
      'ImportClause',
      'NamespaceImport',
      'ImportSpecifier',
    ],
    match(node) {
      return getName(node) !== undefined
    },
  })

  return typeDeclarations
}
