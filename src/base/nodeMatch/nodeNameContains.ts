import * as ts from 'typescript'
import { getNodeName } from '../nodeProperties/getNodeName'

/**
 * Test if the node have a name and if the name contians the input. \
 * IF the input is a RegExp, it test if any part of the text matches the RegExp.
 * @param node ts.Node
 * @param input string | RegExp
 * @returns
 */
export function nodeNameContains(
  node: ts.Node,
  input: string | RegExp,
): boolean {
  const nodeName = getNodeName(node)
  if (!nodeName) {
    return false
  }
  if (typeof input === 'string' && !nodeName.includes(input)) {
    return false
  }
  if (input instanceof RegExp && !input.test(nodeName)) {
    return false
  }
  return true
}
