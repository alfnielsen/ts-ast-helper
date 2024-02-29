import * as ts from 'typescript'
import { nodeToString } from 'src/base/printer/nodeToString'
import type { LogColor } from 'src/util'

export type LogNode = {
  logger?: (message?: any, ...optionalParams: any[]) => void
  compact?: boolean
  box?: boolean
  note?: string
  colors?: LogColor
}

export const logNode = (node: ts.Node, opt: LogNode = {}) => {
  const nodeString = nodeToString(node, { colors: 'gray', ...opt, log: true })
  return nodeString
}
