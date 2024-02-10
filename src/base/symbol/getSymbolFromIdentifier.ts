import * as ts from 'typescript'
import { createProgramFromSourceFile } from 'src/base/program/createProgramFromSourceFile'

export function getSymbolFromIdentifier(
  node: ts.Identifier,
  sourceFile?: ts.SourceFile,
  program?: ts.Program,
) {
  if (!sourceFile) {
    sourceFile = node.getSourceFile()
  }
  if (!program) {
    program = createProgramFromSourceFile(sourceFile)
  }
  const checker = program.getTypeChecker()
  const symbol = checker.getSymbolAtLocation(node)
  return symbol
}
