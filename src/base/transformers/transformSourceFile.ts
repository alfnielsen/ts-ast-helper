import * as ts from 'typescript'
import { transformNode } from './transformNode'

// Run the transformer on the source file
export function transformSourceFile(
  sourceFile: ts.SourceFile,
  ...transformer: ts.TransformerFactory<ts.SourceFile>[]
) {
  return transformNode(sourceFile, ...transformer)
}
