import * as ts from 'typescript'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { findNodesVisitor } from 'src/base/visitors/findNodesVisitor'

export function findNodesInStringVisitor<TNode extends ts.Node = ts.Node>(
  code: string,
  nodeTest: (
    node: ts.Node,
    parent: ts.Node,
    ancestors: ts.Node[],
  ) => undefined | boolean,
): TNode[] {
  const sourceFile = createSourceFileFromCode(code)
  return findNodesVisitor<TNode>(sourceFile, nodeTest)
}
