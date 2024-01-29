import * as ts from 'typescript'
import { getIdentifier } from './base/getters/getIdentifier'
import { getName } from './base/getters/getName'

export const getBaseNodeInfo = (node: ts.Node) => {
  const text = node.getText()
  const fullText = node.getFullText()
  const name = getName(node) ?? ''
  const fullStart = node.getFullStart()
  const start = node.getStart()
  const end = node.getEnd()
  const type = node.kind
  const sourceFile = node.getSourceFile()
  return {
    text,
    fullText,
    name,
    start,
    fullStart,
    end,
    type,
    sourceFile,
  }
}
