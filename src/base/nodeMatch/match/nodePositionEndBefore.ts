import * as ts from 'typescript'

export function nodePositionEndBefore(node: ts.Node, index: number) {
  return node.end < index
}
