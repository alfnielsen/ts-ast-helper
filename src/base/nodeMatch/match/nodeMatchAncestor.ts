import { nodeMatchOptions, type NodeMatchOptions } from 'src/base'
import * as ts from 'typescript'

/**
 * Match one of the ancestors of the node (parent, grandparent, etc.)
 * @param node
 * @param match
 * @returns
 */
export function nodeMatchAncestor(
  node: ts.Node,
  options: NodeMatchOptions,
): boolean {
  let ancestor = node.parent
  while (ancestor) {
    if (nodeMatchOptions(ancestor, options)) {
      return true
    }
    ancestor = ancestor.parent
  }
  return false
}
