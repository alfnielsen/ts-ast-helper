import * as ts from 'typescript'
import { getModifiers } from 'src/base/nodeProperties/getModifiers'

export const hasModifier = (node: ts.Node, modifier: ts.ModifierSyntaxKind) => {
  const found = getModifiers(node).some((child) => child.kind === modifier)
  return found
}
