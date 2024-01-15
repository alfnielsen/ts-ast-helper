import * as ts from "typescript"

export function startBeforeIndex(node?: ts.Node, index: number = 0) {
  if (!node) return false
  const start = node.getStart()
  return start < index
}

export function startBeforeFullIndex(node?: ts.Node, index: number = 0) {
  if (!node) return false
  const start = node.getStart()
  return start < index
}

export function startAfterIndex(node?: ts.Node, index: number = 0) {
  if (!node) return false
  const start = node.getStart()
  return start > index
}

export function startAfterFullIndex(node?: ts.Node, index: number = 0) {
  if (!node) return false
  const start = node.getStart()
  return start > index
}

export function endBeforeIndex(node?: ts.Node, index: number = 0) {
  if (!node) return false
  return node.end < index
}

export function endAfterIndex(node?: ts.Node, index: number = 0) {
  if (!node) return false
  return node.end > index
}
