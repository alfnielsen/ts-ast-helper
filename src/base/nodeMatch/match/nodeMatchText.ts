import * as ts from 'typescript'

/**
 * Match the entire text of the name \
 * If match is a RegExp it must also match the entire content. \
 * @see nodeTextContains for partly match
 * @param node ts.Node
 * @param match string | RegExp
 * @returns
 */
export function nodeMatchText(node: ts.Node, match: string | RegExp): boolean {
  const text = node.getText()
  if (typeof match === 'string' && match !== text) {
    return false
  }
  if (match instanceof RegExp) {
    const m = text.match(match)
    if (!m || m[0] !== text) {
      return false
    }
  }
  return true
}
