import * as ts from 'typescript'
import { ModifierLikeMap } from 'src/base/getters/typeMaps/ModifierLikeMap'
import { hasModifierLike } from 'src/base'

export const hasModifierLikes = (
  node: ts.Node,
  ...modifiers: (ts.ModifierSyntaxKind | keyof typeof ModifierLikeMap)[]
) => {
  return modifiers.every((m) => hasModifierLike(node, m))
}
