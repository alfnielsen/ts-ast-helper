import * as ts from 'typescript'
import { nodeMatchType, type NodeTypeMap } from './nodeMatchType'

export function nodeMatchOneOfTypes(
  node: ts.Node,
  ...types: (NodeTypeMap | keyof typeof NodeTypeMap)[]
): boolean {
  for (let type of types) {
    const found = nodeMatchType(node, type)
    if (found) {
      return true
    }
  }
  return false
}
