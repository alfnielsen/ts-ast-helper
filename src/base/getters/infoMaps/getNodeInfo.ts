import * as ts from 'typescript'
import { getNodeFlagNames } from 'src/base/getters/typeDefinitionGetters/getNodeFlagNames'

export type NodeInfo = {
  text: string
  start: number
  end: number
  kind: string
  flagNames?: string[]
  flags?: number
}

export function getNodeInfo(node: ts.Node) {
  return {
    text: node.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
    flagNames: getNodeFlagNames(node.flags),
    flags: node.flags,
  } satisfies NodeInfo
}
