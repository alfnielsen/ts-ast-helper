import * as ts from 'typescript'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { findNodeVisitor } from 'src/base/visitors/findNodeVisitor'

export function findNodeInStringVisitor<TNode extends ts.Node = ts.Node>(
  code: string,
  nodeTest: (
    node: ts.Node,
    parent: ts.Node,
    ancestors: ts.Node[],
  ) => undefined | boolean,
): TNode | undefined {
  const sourceFile = createSourceFileFromCode(code)
  return findNodeVisitor<TNode>(sourceFile, nodeTest)
}
