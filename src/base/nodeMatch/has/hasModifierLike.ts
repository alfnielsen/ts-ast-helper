import * as ts from 'typescript'
import { getModifierLikes } from 'src/base/getters/nodePropertyGetters/getModifierLikes'
import { ModifierLikeMap } from 'src/base/getters/typeMaps/ModifierLikeMap'

export const hasModifierLike = (
  node: ts.Node,
  modifier: ts.ModifierSyntaxKind | keyof typeof ModifierLikeMap,
) => {
  const nodeModifiers = getModifierLikes(node)
  if (typeof modifier === 'string') {
    modifier = ModifierLikeMap[modifier]
  }
  return nodeModifiers.some((nm) => nm.kind === modifier)
}
