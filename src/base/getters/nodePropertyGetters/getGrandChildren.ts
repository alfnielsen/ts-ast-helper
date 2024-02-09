import * as ts from 'typescript'

export function getGrandChildren(node: ts.Node) {
  const grandChildren: ts.Node[] = []
  function collectChildren(parent: ts.Node) {
    const children = parent.getChildren()
    if (children.length === 0) {
      return
    }
    for (let child of children) {
      collectChildren(child)
    }
  }
  collectChildren(node)
  return grandChildren
}
