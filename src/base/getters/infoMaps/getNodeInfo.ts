import * as ts from 'typescript'
import { getNodeFlagNames } from 'src/base/getters/typeDefinitionGetters/getNodeFlagNames'
import { nodeKind } from 'src/base/printer/nodeKind'

export type NodeInfo = {
  text: string
  start: number
  end: number
  kind: string
  kindValue: number
  flags?: string[]
  flagValue?: number
}

export function getNodeInfo(node: ts.Node) {
  return {
    text: node.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: nodeKind(node),
    kindValue: node.kind as number,
    flags: getNodeFlagNames(node.flags),
    flagValue: node.flags,
  } satisfies NodeInfo
}
