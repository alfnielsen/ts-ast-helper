import * as ts from 'typescript'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import {
  findFunctions,
  type FindFunctionOptions,
} from 'src/base/nodeFinders/findMany/findFunctions'

export function findFunctionsInCode(
  code: string,
  opt: FindFunctionOptions = {},
) {
  const sourceFile = createSourceFileFromCode(code)
  return findFunctions(sourceFile, opt)
}
