import { create } from 'domain'
import { createProgramFromSourceFile } from 'src/base'
import * as ts from 'typescript'

/**
 * This function do NOT return the original program checker., if a program is not provided. \
 * @param node
 * @returns
 */
export function getChecker(
  node: ts.Node,
  program?: ts.Program,
  sourceFile?: ts.SourceFile,
) {
  if (program) {
    return program.getTypeChecker()
  }
  sourceFile ??= node.getSourceFile()
  program = program || createProgramFromSourceFile(sourceFile)
  return program.getTypeChecker()
}
