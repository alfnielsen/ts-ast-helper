import * as ts from "typescript"
import { doesNodeHasName } from "./nodeTests/hasName"
import { getNodeName } from "./getNodeName"

export const getBaseNodeInfo = (node: ts.Node) => {
  const text = node.getText()
  const fullText = node.getFullText()
  const name = getNodeName(node) ?? ""
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
