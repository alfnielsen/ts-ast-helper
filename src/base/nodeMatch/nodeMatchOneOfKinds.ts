import * as ts from 'typescript'
import { nodeMatchKind } from './nodeMatchKind'

export function nodeMatchOneOfKinds(
  node: ts.Node,
  ...kinds: (ts.SyntaxKind | keyof typeof ts.SyntaxKind)[]
): boolean {
  for (let kind of kinds) {
    const found = nodeMatchKind(node, kind)
    if (found) {
      return true
    }
  }
  return false
}
