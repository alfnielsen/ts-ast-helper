import * as ts from 'typescript'
import { nodeKind } from 'src/base/printer/nodeKind'
import { visitor } from 'src/base/visitors/visitor'
export function printSimpleAst(node: ts.Node) {
  console.log(nodeKind(node))
  visitor(node, (child, { depth }) => {
    console.log('-'.repeat(depth) + ' ' + nodeKind(child))
  })
}
