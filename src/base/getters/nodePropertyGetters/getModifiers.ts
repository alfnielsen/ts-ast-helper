import * as ts from 'typescript'
import { getAstChildren } from 'src/base/getters/nodePropertyGetters/getAstChildren'

/**
 * Return ts modifers (this dont include decorators like 'async', consider using getModiferLikes)
 * @see getModiferLikes
 * @param node
 * @returns
 */
export const getModifiers = (node: ts.Node): ts.Modifier[] => {
  const children = getAstChildren(node)
  const modifiers = children.filter((child) =>
    ts.isModifier(child),
  ) as ts.Modifier[]
  return modifiers
}
