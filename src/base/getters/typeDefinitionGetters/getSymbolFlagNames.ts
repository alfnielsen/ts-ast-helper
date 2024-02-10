import * as ts from 'typescript'

export function getSymbolFlagNames(flag: ts.SymbolFlags): string[] {
  const flagStrings = Object.entries(ts.SymbolFlags)
    .filter(([key, val]) => (flag & (val as ts.SymbolFlags)) !== 0)
    .map(([key, val]) => key)
  return flagStrings
}
