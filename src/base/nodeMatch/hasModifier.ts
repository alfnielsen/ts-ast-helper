import * as ts from 'typescript'
import { getModifiers } from 'src/base/getters/getModifiers'
import { nodeKinds } from 'src/base/printer/nodeKinds'

export const hasModifier = (node: ts.Node, modifier: ts.ModifierSyntaxKind) => {
  const nodeModifiers = getModifiers(node)
  return nodeModifiers.some((nm) => nm.kind === modifier)
}
