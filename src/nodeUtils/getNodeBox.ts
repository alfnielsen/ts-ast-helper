import * as ts from "typescript"

export const getNodeBox = (node: ts.Node) => {
  // const width = text // this is the lenght of the text!
  const text = node.getFullText() // this is the lenght of the text!
  const lines = text.split("\n") // this is the lenght of the text!
  const height = lines.length
  const width = lines.reduce((w, l) => {
    if (l.length > w) {
      w = l.length
    }
    return w
  }, 0)

  return {
    width,
    height,
  }
}
