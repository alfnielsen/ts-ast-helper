import * as ts from 'typescript'

export const hasModifierFlag = (
  node: ts.Declaration,
  nodeFalg: ts.ModifierFlags | keyof typeof ts.ModifierFlags,
) => {
  return (
    (ts.getCombinedModifierFlags(node) &
      (ts.ModifierFlags[nodeFalg] as ts.ModifierFlags)) !==
    0
  )
}
