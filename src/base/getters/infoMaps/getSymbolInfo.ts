import * as ts from 'typescript'
import {
  getDeclarationInfo,
  type DeclarationInfo,
} from 'src/base/getters/infoMaps/getDeclarationInfo'
import { getSymbolTableInfo } from 'src/base/getters/infoMaps/getSymbolTableInfo'
import { getSymbolFlagNames } from 'src/base/getters/typeDefinitionGetters/getSymbolFlagNames'

export type SymbolInfo = {
  name: string
  valueDeclaration?: DeclarationInfo
  declarations?: DeclarationInfo[]
  members?: Record<string, SymbolInfo>
  exports?: Record<string, SymbolInfo>
  globalExports?: Record<string, SymbolInfo>
  flagNames?: string[]
  flags?: ts.SymbolFlags
}

export function getSymbolInfo(symbol: ts.Symbol) {
  return {
    name: symbol.name,
    valueDeclaration:
      symbol.valueDeclaration && getDeclarationInfo(symbol.valueDeclaration),
    declarations:
      symbol.declarations && symbol.declarations.map(getDeclarationInfo),
    members: symbol.members && getSymbolTableInfo(symbol.members),
    exports: symbol.exports && getSymbolTableInfo(symbol.exports),
    globalExports:
      symbol.globalExports && getSymbolTableInfo(symbol.globalExports),
    flags: symbol.flags,
    flagNames: getSymbolFlagNames(symbol.flags),
  } satisfies SymbolInfo
}
