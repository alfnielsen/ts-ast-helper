import * as ts from "typescript"

export function visitor(root: ts.Node, predicate: (node: ts.Node, parent: ts.Node, ancestors: ts.Node[]) => void) {
  function visit(node: ts.Node, parent: ts.Node, ancestors: ts.Node[]) {
    predicate(node, parent, ancestors)
    const nextAncestorList = [node, ...ancestors]
    node.forEachChild(child => visit(child, node, nextAncestorList))
  }
  const nextAncestorList = [root]
  root.forEachChild(child => {
    visit(child, root, nextAncestorList)
  })
}
