import {
  getNodeInfo,
  type NodeInfo,
} from 'src/base/getters/infoMaps/getNodeInfo'
import * as ts from 'typescript'

export type ParameterInfo = NodeInfo & {
  name: string
  type: string
  optional: boolean
  spread: boolean
  modifiers: string[]
  typeInfo?: NodeInfo | undefined
}

/**
 * Under construction! (Simly name info for now)
 * @param node
 * @returns
 */
export function getParameterInfo(node: ts.ParameterDeclaration) {
  const nodeInfo = getNodeInfo(node)
  // const nameBinding = node.name // lots of stuff here.. (for now we use the text)
  return {
    ...nodeInfo,
    name: node.name.getText(),
    type: node.type?.getText() ?? '',
    typeInfo: node.type ? getNodeInfo(node.type) : undefined,
    optional: node.questionToken !== undefined,
    spread: node.dotDotDotToken !== undefined,
    modifiers: node.modifiers?.map((m) => m.getText()) ?? [],
  } satisfies ParameterInfo
}
