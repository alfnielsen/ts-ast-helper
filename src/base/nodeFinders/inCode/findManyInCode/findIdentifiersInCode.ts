import * as ts from 'typescript'
import type { FindNodeOptions } from 'src/base/nodeFinders/findNodes'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { findIdentifiers } from 'src/base/nodeFinders/findMany/findIdentifiers'

export function findIdentifiersInCode(code: string, opt: FindNodeOptions = {}) {
  const sourceFile = createSourceFileFromCode(code)
  return findIdentifiers(sourceFile, opt)
}
