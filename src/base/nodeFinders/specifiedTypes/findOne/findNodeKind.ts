import * as ts from 'typescript'
import { findNode, type FindNodeOptions } from 'src/base/nodeFinders/findNode'

export type FindNodeKindOptions = Omit<
  FindNodeOptions,
  'kind' | 'oneOfKinds' | 'type' | 'oneOfTypes'
> & {
  isVariableDeclaration?: true
}

export function findNodeKind<TType extends ts.Node = ts.Node>(
  node: ts.Node,
  kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind,
  opt: FindNodeKindOptions = {},
) {
  const findKindOptions: FindNodeOptions = {
    ...opt,
    kind,
  }
  return findNode<TType>(node, findKindOptions)
}
