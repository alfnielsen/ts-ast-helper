import * as ts from 'typescript'
import { nodeKind } from 'src/base/printer/nodeKind'
import { getAncestors } from 'src/base/getters/nodePropertyGetters/getAncestors'

export function printSimpleAncestorsList(node: ts.Node) {
  getAncestors(node)
    .reverse()
    .forEach((ancestor, depth) => {
      console.log('-'.repeat(depth) + ' ' + nodeKind(ancestor))
    })
}
