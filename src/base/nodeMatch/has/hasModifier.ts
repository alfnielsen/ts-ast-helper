import * as ts from 'typescript'
import { getModifiers } from 'src/base/getters/nodePropertyGetters/getModifiers'
import { ModifierLikeMap } from 'src/base/getters/typeMaps/ModifierLikeMap'

export const hasModifier = (
  node: ts.Node,
  modifier: ts.ModifierSyntaxKind | keyof typeof ModifierLikeMap,
) => {
  const nodeModifiers = getModifiers(node)
  if (typeof modifier === 'string') {
    modifier = ModifierLikeMap[modifier]
  }
  return nodeModifiers.some((nm) => nm.kind === modifier)
}
