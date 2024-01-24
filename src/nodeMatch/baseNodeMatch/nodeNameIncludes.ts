import * as ts from 'typescript'
import { getNodeName } from '../../nodeUtils/getNodeName'

export function nodeNameIncludes(node: ts.Node, name: string): boolean {
  const nodeName = getNodeName(node)
  if (!nodeName) {
    return false
  }
  if (typeof name === 'string' && !nodeName.includes(name)) {
    return false
  }
  return true
}
