import * as ts from 'typescript'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { findNodesVisitor } from 'src/base/visitors/findNodesVisitor'
import type { NodeTestPedicate } from 'src/base/visitors/findNodeVisitor'

export function findNodesInStringVisitor<TNode extends ts.Node = ts.Node>(
  code: string,
  nodeTest: NodeTestPedicate,
): TNode[] {
  const sourceFile = createSourceFileFromCode(code)
  return findNodesVisitor<TNode>(sourceFile, nodeTest)
}
