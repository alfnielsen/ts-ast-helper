import * as ts from 'typescript'
import { getAstChildren } from 'src/base/getters/getAstChildren'

export const getModifiers = (node: ts.Node): ts.Modifier[] => {
  const children = getAstChildren(node)
  const modifiers = children.filter((child) =>
    ts.isModifier(child),
  ) as ts.Modifier[]
  return modifiers
}
