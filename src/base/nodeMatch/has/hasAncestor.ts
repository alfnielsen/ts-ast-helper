import * as ts from 'typescript'
import { findAncestor } from 'src/base/nodeFinders/findAncestor'
import type { NodeMatchOptions } from 'src/base/nodeMatch/match/nodeMatchOptions'

export const hasAncestor = (node: ts.Node, options: NodeMatchOptions) => {
  return !!findAncestor(node, options)
}
