import * as ts from 'typescript'
import { ModifierLikeMap } from 'src/base/getters/typeMaps/ModifierLikeMap'
import { hasModifier } from 'src/base/nodeMatch/has/hasModifier'

export const hasModifiers = (
  node: ts.Node,
  ...modifiers: (ts.ModifierSyntaxKind | keyof typeof ModifierLikeMap)[]
) => {
  return modifiers.every((m) => hasModifier(node, m))
}
