import * as ts from "typescript"
import { doesNodeHasName } from "./nodeTests/hasName"

export const getNodeName = (node: ts.Node, sourceFile: ts.SourceFile) => {
  console.log("--getNodeName--")
  console.log(ts.SyntaxKind[node.kind])
  if (ts.isFunctionDeclaration(node)) {
    console.log("-| is function |-")
    console.log(`${node.getText(sourceFile)}`)
    console.log("-| name |-", node.name?.getText(sourceFile))
  }
  if (ts.isVariableDeclaration(node)) {
    console.log("-| is variable |-")
    console.log("-| name |-", node.name?.getText(sourceFile))
  }
  //@ts-ignore
  console.log(node.name)
  if (!doesNodeHasName(node)) return undefined
  return node.name.getText()
}
