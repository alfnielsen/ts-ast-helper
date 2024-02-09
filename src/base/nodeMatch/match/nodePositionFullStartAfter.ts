import * as ts from 'typescript'

export function nodePositionFullStartAfter(node: ts.Node, index: number) {
  const start = node.getFullStart()
  return start > index
}
