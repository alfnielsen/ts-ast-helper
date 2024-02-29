import { getName, nodeKind } from 'src/base'
import { nodeText } from 'src/base/printer/nodeText'
import { $t, lineChar, type LogColor } from 'src/util'
import * as ts from 'typescript'

export type NodeToString = {
  log?: boolean
  logger?: (message?: any, ...optionalParams: any[]) => void
  compact?: boolean
  box?: boolean
  note?: string
  colors?: LogColor
}

export const nodeToString = (node: ts.Node, opt: NodeToString = {}) => {
  const { compact = false, log, logger = console.log, note, box, colors } = opt
  const name = getName(node)
  const text = nodeText(node)
  let tag = ''
  if (name) {
    tag += name + ':'
  }
  tag += nodeKind(node)

  let msg = ''
  let msgWidth = msg
    .split('\n')
    .reduce((p, c) => (c.length > p ? c.length : p), 0)
  if (box) {
    msg += lineChar.repeat(msgWidth)
  }
  if (note) {
    msg += note
  }
  let startTag = `[${tag}]`
  let endTag = `[/${tag}]`
  if (colors) {
    const c = $t[colors as keyof typeof $t] ?? colors
    startTag = `${c}${startTag}${$t.reset}`
    endTag = `${c}${endTag}${$t.reset}`
  }
  if (compact) {
    msg = `${startTag}${text}${endTag}`
  } else {
    msg = `${startTag}\n${text}\n${endTag}`
  }
  if (box) {
    msg += lineChar.repeat(msgWidth)
  }

  if (log) {
    logger(msg)
  }

  return msg
}
