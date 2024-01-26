import * as ts from 'typescript'

export const getModifiers = (node: ts.Node): ts.Modifier[] => {
  const children = node.getChildren()
  const idenfifier = children.filter((child) =>
    ts.isModifier(child),
  ) as ts.Modifier[]
  return idenfifier
}
