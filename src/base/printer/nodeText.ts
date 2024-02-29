import * as ts from 'typescript'

export const nodeText = (node: ts.Node) => {
  return node.getText()
}
