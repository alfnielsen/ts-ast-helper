import * as ts from 'typescript'
import {
  getSymbolInfo,
  type SymbolInfo,
} from 'src/base/getters/infoMaps/getSymbolInfo'

export type SymbolTableInfo = Record<string, SymbolInfo> & {}

export function getSymbolTableInfo(table: ts.SymbolTable) {
  const tableInfo: SymbolTableInfo = {}
  for (const symbol of table.values()) {
    tableInfo[symbol.name] = getSymbolInfo(symbol)
  }
  return tableInfo satisfies SymbolTableInfo
}
