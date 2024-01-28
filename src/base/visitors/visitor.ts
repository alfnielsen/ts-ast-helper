import * as ts from 'typescript'

export type VisitorPredicateParamters = {
  parent: ts.Node
  ancestors: ts.Node[]
  depth: number
}

export function visitor(
  root: ts.Node,
  predicate: (node: ts.Node, parameters: VisitorPredicateParamters) => void,
) {
  function visit(node: ts.Node, parent: ts.Node, ancestors: ts.Node[]) {
    predicate(node, { parent, ancestors, depth: ancestors.length })
    const nextAncestorList = [node, ...ancestors]
    ts.forEachChild(node, (child) => visit(child, node, nextAncestorList))
  }
  const nextAncestorList = [root]
  ts.forEachChild(root, (child) => visit(child, root, nextAncestorList))
}
