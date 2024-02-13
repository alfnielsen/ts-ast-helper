import * as ts from 'typescript'
import type { FindNodeKindOptions } from 'src/base/nodeFinders/findOne/findNodeKind'
import { findNodeKinds } from 'src/base/nodeFinders/findMany/findNodeKinds'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'

export function findNodeKindsInCode<TType extends ts.Node = ts.Node>(
  code: string,
  kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind,
  opt: FindNodeKindOptions = {},
) {
  const sourceFile = createSourceFileFromCode(code)

  return findNodeKinds<TType>(sourceFile, kind, opt)
}
