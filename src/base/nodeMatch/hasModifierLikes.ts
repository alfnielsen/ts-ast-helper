import * as ts from 'typescript'
import { getModifierLikes } from 'src/base/getters/getModifierLikes'
import { ModifierLikeMap } from 'src/base/getters/ModifierLikeMap'

export const hasModifierLikes = (
  node: ts.Node,
  ...modifiers: (ts.ModifierSyntaxKind | keyof typeof ModifierLikeMap)[]
) => {
  const nodeModifiers = getModifierLikes(node)
  modifiers = modifiers.map((m) =>
    typeof m === 'string' ? ModifierLikeMap[m] : m,
  )
  const foundAll = modifiers.every((m) =>
    nodeModifiers.some((nm) => nm.kind === m),
  )
  return foundAll
}
