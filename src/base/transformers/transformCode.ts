import * as ts from 'typescript'
import { createSourceFileFromCode } from '../sourceFile/createSourceFileFromCode'

export function transformCode(
  code: string,
  ...transformer: ts.TransformerFactory<ts.SourceFile>[]
) {
  // creat a source file from the code
  const sourceFile = createSourceFileFromCode(code)
  // transform the source file
  const result = ts.transform(sourceFile, transformer)
  const transformedSourceFile = result.transformed[0] as ts.SourceFile
  return transformedSourceFile
}
