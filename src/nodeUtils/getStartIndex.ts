import * as ts from "typescript"
import { getText } from "./getText"

export const getStartIndex = (node: ts.Node) => {
  const text = getText(node)
  return node.end - text
}
