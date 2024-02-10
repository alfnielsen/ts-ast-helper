import * as ts from 'typescript'

export function getModifierFlagNames(flag: ts.ModifierFlags): string[] {
  const flagStrings = Object.entries(ts.ModifierFlags)
    .filter(([key, val]) => (flag & (val as ts.ModifierFlags)) !== 0)
    .map(([key, val]) => key)
  return flagStrings
}
