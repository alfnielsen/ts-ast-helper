import * as ts from 'typescript'
import { createSourceFileFromCode } from '../sourceFile/createSourceFileFromCode'
import { transformNode } from './transformNode'

export function transformCodeToSourceFile(
  code: string,
  ...transformer: ts.TransformerFactory<ts.SourceFile>[]
) {
  // creat a source file from the code
  const sourceFile = createSourceFileFromCode(code)
  // transform the source file
  const transformedSourceFile = transformNode(sourceFile, ...transformer)
  return transformedSourceFile
}
