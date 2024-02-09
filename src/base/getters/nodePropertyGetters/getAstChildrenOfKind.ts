import * as ts from 'typescript'
import { getAstChildren } from 'src/base/getters/nodePropertyGetters/getAstChildren'

export function getAstChildrenOfKind<TType extends ts.Node = ts.Node>(
  parent: ts.Node,
  kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind,
) {
  return getAstChildren(parent).filter(
    (child) => child.kind === kind,
  ) as TType[]
}
