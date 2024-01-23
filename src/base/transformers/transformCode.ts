import * as ts from 'typescript'
import { transformCodeToNode } from './transformCodeToSoruceFile'
import { printSourceFile } from '../printer/printSourceFile'

export function transformCode(
  code: string,
  ...transformer: ts.TransformerFactory<ts.SourceFile>[]
) {
  const sourceFile = transformCodeToNode(code, ...transformer)
  const transformedCode = printSourceFile(sourceFile)
  return transformedCode
}
