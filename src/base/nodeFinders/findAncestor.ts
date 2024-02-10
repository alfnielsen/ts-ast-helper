import * as ts from 'typescript'
import { nodeMatchOptions, type NodeMatchOptions } from 'src/base'

export function findAncestor<TNode extends ts.Node = ts.Node>(
  node: ts.Node,
  options: NodeMatchOptions,
): TNode | undefined {
  return ts.findAncestor(node, (parent) =>
    nodeMatchOptions(parent, options),
  ) as TNode | undefined
}
