import * as ts from 'typescript'
import { findNodesInCode, getName } from 'src/base'

export type GetAllTypeDefsFromString = {
  content: string
  includeEnums?: boolean
}

export function getAllTypeDefsFromString(opt: GetAllTypeDefsFromString) {
  const { content, includeEnums = true } = opt
  // collect all type definations:
  const typeDeclarations = findNodesInCode<ts.Node>(content, {
    type: 'TypeDefitionen',
    match(node) {
      return getName(node) !== undefined
    },
  })
  if (includeEnums) {
    const enumDeclarations = findNodesInCode<ts.Node>(content, {
      kind: 'EnumDeclaration',
      match(node) {
        return getName(node) !== undefined
      },
    })
    return [...typeDeclarations, ...enumDeclarations]
  }

  return typeDeclarations
}
