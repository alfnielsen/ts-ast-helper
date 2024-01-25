import * as ts from 'typescript'
import { nodeMatchName } from './nodeMatchName'

export function nodeMatchOneOfNames(
  node: ts.Node,
  ...names: (string | RegExp)[]
): boolean {
  for (let name of names) {
    const found = nodeMatchName(node, name)
    if (found) {
      return true
    }
  }
  return false
}
