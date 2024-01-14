import * as ts from "typescript"

export const getText = (node: ts.Node) => {
  const sourceFile = node.getSourceFile()
  if (!sourceFile) {
    // console.log("getText!::source::", sourceFile)
    // console.log("getText!::node::", node)
  }
  return node.getText(sourceFile).length
}
