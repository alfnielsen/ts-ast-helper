import * as ts from 'typescript'
import { transformCodeToSourceFile } from './transformCodeToSourceFile'
import { printSourceFile } from '../printer/printSourceFile'

export function transformCode(
  code: string,
  ...transformer: ts.TransformerFactory<ts.SourceFile>[]
) {
  const sourceFile = transformCodeToSourceFile(code, ...transformer)
  const transformedCode = printSourceFile(sourceFile)
  return transformedCode
}
