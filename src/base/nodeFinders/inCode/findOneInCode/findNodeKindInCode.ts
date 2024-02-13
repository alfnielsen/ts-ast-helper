import * as ts from 'typescript'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import {
  findNodeKind,
  type FindNodeKindOptions,
} from 'src/base/nodeFinders/findOne/findNodeKind'

export function findNodeKindInCode<TType extends ts.Node = ts.Node>(
  code: string,
  kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind,
  opt: FindNodeKindOptions = {},
) {
  const sourceFile = createSourceFileFromCode(code)
  return findNodeKind<TType>(sourceFile, kind, opt)
}
