import * as ts from 'typescript'
import { type FindNodeTypeOptions } from 'src/base/nodeFinders/findOne/findNodeType'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { findFunction } from 'src/base/nodeFinders/findOne/findFunction'

export function findFunctionInCode(
  code: string,
  opt: FindNodeTypeOptions = {},
) {
  const sourceFile = createSourceFileFromCode(code)
  return findFunction(sourceFile, opt)
}
