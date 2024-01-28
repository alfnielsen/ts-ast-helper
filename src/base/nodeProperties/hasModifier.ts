import * as ts from 'typescript'
import { getModifiers } from 'src/base/nodeProperties/getModifiers'
import { nodeKinds } from 'src/base/nodeProperties/nodeKinds'

export const hasModifier = (node: ts.Node, modifier: ts.ModifierSyntaxKind) => {
  const nodeModifiers = getModifiers(node)
  console.log(
    'hasModifier():',
    'node:',
    ts.SyntaxKind[node.kind],
    'nodeModifiers:',
    nodeKinds(...nodeModifiers),
    'modifier:',
    ts.SyntaxKind[modifier],
  )
  return nodeModifiers.some((nm) => nm.kind === modifier)
}
