import * as ts from 'typescript'

/**
 * Return all ModifierLike (Both Modifier and Decorator - this include both export and async) \
 * @param node
 * @returns
 */
export const getModifierLikes = (node: ts.Node): ts.ModifierLike[] => {
  const modifiers =
    (node as unknown as { modifiers: ts.ModifierLike[] }).modifiers ?? []
  return modifiers
}
