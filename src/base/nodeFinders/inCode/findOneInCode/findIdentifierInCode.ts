import * as ts from 'typescript'
import type { FindNodeOptions } from 'src/base/nodeFinders/findNodes'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { findIdentifier } from 'src/base/nodeFinders/findOne/findIdentifier'

export function findIdentifierInCode(code: string, opt: FindNodeOptions = {}) {
  const sourceFile = createSourceFileFromCode(code)
  return findIdentifier(sourceFile, opt)
}
