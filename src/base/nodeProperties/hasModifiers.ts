import * as ts from 'typescript'
import { getModifiers } from 'src/base/nodeProperties/getModifiers'

export const hasModifiers = (
  node: ts.Node,
  ...modifiers: ts.ModifierSyntaxKind[]
) => {
  const nodeModifiers = getModifiers(node)
  const foundAll = modifiers.every((m) =>
    nodeModifiers.some((nm) => nm.kind === m),
  )
  return foundAll
}
