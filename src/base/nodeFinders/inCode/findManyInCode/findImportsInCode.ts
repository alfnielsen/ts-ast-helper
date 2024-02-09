import * as ts from 'typescript'
import { type FindNodeTypeOptions } from 'src/base/nodeFinders/findOne/findNodeType'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { findImports } from 'src/base/nodeFinders/findMany/findImports'

export function findImportsInCode(code: string, opt: FindNodeTypeOptions = {}) {
  const sourceFile = createSourceFileFromCode(code)
  return findImports(sourceFile, opt)
}
