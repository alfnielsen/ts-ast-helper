import * as ts from 'typescript'
import { type FindNodeTypeOptions } from 'src/base/nodeFinders/findOne/findNodeType'
import { findImport } from 'src/base/nodeFinders/findOne/findImport'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'

export function findImportInCode(code: string, opt: FindNodeTypeOptions = {}) {
  const sourceFile = createSourceFileFromCode(code)
  return findImport(sourceFile, opt)
}
