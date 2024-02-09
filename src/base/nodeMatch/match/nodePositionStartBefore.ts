import * as ts from 'typescript'

export function nodePositionStartBefore(node: ts.Node, index: number) {
  const start = node.getStart()
  return start < index
}
