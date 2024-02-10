import * as ts from 'typescript'
import type { NodeMatchOptions } from 'src/base'
import { findAncestor } from 'src/base/nodeFinders/findAncestor'

export const hasModifier = (node: ts.Node, options: NodeMatchOptions) => {
  return !!findAncestor(node, options)
}
