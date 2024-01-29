import * as ts from 'typescript'
import { getModifiers } from 'src/base/getters/getModifiers'

export const hasOneOfModifiers = (
  node: ts.Node,
  ...modifiers: ts.ModifierSyntaxKind[]
) => {
  const nodeModifiers = getModifiers(node)
  const foundAll = modifiers.some((m) =>
    nodeModifiers.some((nm) => nm.kind === m),
  )
  return foundAll
}
