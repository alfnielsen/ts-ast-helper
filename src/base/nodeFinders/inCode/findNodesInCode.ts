import * as ts from 'typescript'
import { nodeMatchOptions } from 'src/base/nodeMatch/match/nodeMatchOptions'
import { findNodesVisitor } from 'src/base/visitors/findNodesVisitor'
import type { FindNodeOptions } from 'src/base/nodeFinders/findNodes'
import { createProgramFromCode } from 'src/base/program/createProgramFromCode'

export function findNodesInCode<TType extends ts.Node = ts.Node>(
  code: string,
  opt: FindNodeOptions = {},
) {
  const program = createProgramFromCode(code, { fileName: 'file.ts' })
  const sourceFile = program.getSourceFile('file.ts')!
  return findNodesVisitor<TType>(sourceFile, (node) =>
    nodeMatchOptions(node, opt),
  )
}
