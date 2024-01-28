import * as ts from 'typescript'
import { findNode, type FindNodeOptions } from 'src/base/nodeFinders/findNode'
import type { FindNodeKindOptions } from 'src/base/nodeFinders/specifiedTypes/findOne/findNodeKind'
import { findNodes } from 'src/base/nodeFinders/findNodes'

export function findNodeKinds<TType extends ts.Node = ts.Node>(
  node: ts.Node,
  kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind,
  opt: FindNodeKindOptions = {},
) {
  const findKindOptions: FindNodeOptions = {
    ...opt,
    kind,
  }
  return findNodes<TType>(node, findKindOptions)
}
