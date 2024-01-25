import * as ts from 'typescript'

/**
 * Test if the string or RegExp are contained in the node text.
 * If match is a RegExp it must also match the entire content. \
 * @see nodeTextMatch for full match
 * @param node ts.Node
 * @param match string | RegExp
 * @returns
 */
export function nodeTextContainsText(
  node: ts.Node,
  match: string | RegExp,
): boolean {
  const text = node.getText()
  if (typeof match === 'string' && !text.includes(text)) {
    return false
  }
  if (match instanceof RegExp && !match.test(text)) {
    return false
  }
  return true
}
