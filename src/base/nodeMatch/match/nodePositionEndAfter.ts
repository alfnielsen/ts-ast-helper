import * as ts from 'typescript'

export function nodePositionEndAfter(node: ts.Node, index: number) {
  return node.end > index
}
