import * as ts from 'typescript'
import { getModifiers } from 'src/base/getters/getModifiers'
import { ModifierLikeMap } from 'src/base/getters/ModifierLikeMap'

export const hasModifiers = (
  node: ts.Node,
  ...modifiers: (ts.ModifierSyntaxKind | keyof typeof ModifierLikeMap)[]
) => {
  const nodeModifiers = getModifiers(node)
  modifiers = modifiers.map((m) =>
    typeof m === 'string' ? ModifierLikeMap[m] : m,
  )
  const foundAll = modifiers.every((m) =>
    nodeModifiers.some((nm) => nm.kind === m),
  )
  return foundAll
}
