import * as ts from 'typescript'
import { getNodeName } from '../nodeProperties/getNodeName'

export function nodeMatchName(node: ts.Node, name: string | RegExp): boolean {
  const nodeName = getNodeName(node)
  if (!nodeName) {
    return false
  }
  if (typeof name === 'string' && name != nodeName) {
    return false
  }
  if (name instanceof RegExp && !name.test(nodeName)) {
    return false
  }

  return true
}
