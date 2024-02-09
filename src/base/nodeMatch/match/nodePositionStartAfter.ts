import * as ts from 'typescript'

export function nodePositionStartAfter(node: ts.Node, index: number) {
  const start = node.getStart()
  return start > index
}
