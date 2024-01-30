import * as ts from 'typescript'
import { getModifiers } from 'src/base/getters/getModifiers'

export const hasModifier = (node: ts.Node, modifier: ts.ModifierSyntaxKind) => {
  const nodeModifiers = getModifiers(node)
  return nodeModifiers.some((nm) => nm.kind === modifier)
}
