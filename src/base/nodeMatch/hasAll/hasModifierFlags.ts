import { hasModifierFlag } from 'src/base/nodeMatch/has/hasModifierFlag'
import * as ts from 'typescript'

export const hasModifierFlags = (
  node: ts.Declaration,
  ...nodeFalg: (ts.ModifierFlags | keyof typeof ts.ModifierFlags)[]
) => {
  return nodeFalg.every((f) => hasModifierFlag(node, f))
}
