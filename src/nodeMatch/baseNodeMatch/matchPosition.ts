import * as ts from 'typescript'

export function mnodeStartBeforePosition(node: ts.Node, index: number) {
  const start = node.getStart()
  return start < index
}

export function nodeFullStartBeforePosition(node: ts.Node, index: number) {
  const start = node.getFullStart()
  return start < index
}

export function nodeStartAfterPosition(node: ts.Node, index: number) {
  const start = node.getStart()
  return start > index
}

export function nodeFullStartAfterPosition(node: ts.Node, index: number) {
  const start = node.getFullStart()
  return start > index
}

export function endBeforePosition(node: ts.Node, index: number) {
  return node.end < index
}

export function endAfterPosition(node: ts.Node, index: number) {
  return node.end > index
}
