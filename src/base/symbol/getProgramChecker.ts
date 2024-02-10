import * as ts from 'typescript'
import { createProgramFromSourceFile } from 'src/base/program/createProgramFromSourceFile'

/**
 * Create a program and get the type checker from it. \
 * @param node
 * @returns
 */
export function getProgramChecker(
  node: ts.Node | ts.SourceFile,
  sourceFile?: ts.SourceFile,
) {
  if (ts.isSourceFile(node)) {
    sourceFile = node
  } else if (!sourceFile) {
    sourceFile ??= node.getSourceFile()
  }
  const program = createProgramFromSourceFile(sourceFile)
  const checker = program.getTypeChecker()
  return { checker, program, sourceFile }
}
