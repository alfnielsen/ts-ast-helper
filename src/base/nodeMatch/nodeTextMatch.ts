import * as ts from 'typescript'

/**
 * Test if the node's entire text match the input \
 * If match is a RegExp it must also match the entire content. \
 * @see nodeTextContainsText for partly match
 * @param node ts.Node
 * @param input string | RegExp
 * @returns
 */
export function nodeTextMatch(node: ts.Node, input: string | RegExp): boolean {
  const text = node.getText()
  if (typeof input === 'string' && input !== text) {
    return false
  }
  if (input instanceof RegExp) {
    const m = text.match(input)
    if (!m || m[0] !== text) {
      return false
    }
  }
  return true
}
