import * as ts from 'typescript'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import {
  findNodeVisitor,
  type FindNodeVisitorPredicateParamters,
} from 'src/base/visitors/findNodeVisitor'

export function findNodeInStringVisitor<TNode extends ts.Node = ts.Node>(
  code: string,
  nodeTest: (
    node: ts.Node,
    parameters: FindNodeVisitorPredicateParamters,
  ) => undefined | boolean,
): TNode | undefined {
  const sourceFile = createSourceFileFromCode(code)
  return findNodeVisitor<TNode>(sourceFile, nodeTest)
}
