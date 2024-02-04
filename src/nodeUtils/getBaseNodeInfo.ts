import * as ts from 'typescript'
import { getName } from '../base/getters/getName'
import { getModifiers } from 'src/base/getters/getModifiers'
import { getParameters } from 'src/base/getters/getParameters'

export const getBaseNodeInfo = (node: ts.Node) => {
  const text = node.getText()
  const fullText = node.getFullText()
  const name = getName(node) ?? ''
  const fullStart = node.getFullStart()
  const start = node.getStart()
  const end = node.getEnd()
  const kind = ts.SyntaxKind[node.kind]
  const sourceFile = node.getSourceFile()
  const sourceFileName = sourceFile.fileName
  const sourceFileText = sourceFile.getText()
  const modifier = getModifiers(node)
    .map((m) => m.getText())
    .join(', ')

  const parameters = getParameters(node)
    .map((p) => p.getText())
    .join(', ')

  return {
    text,
    fullText,
    name,
    start,
    fullStart,
    end,
    kind,
    modifier,
    parameters,
    sourceFileName,
    sourceFileText,
  }
}
