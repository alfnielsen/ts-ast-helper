import * as ts from 'typescript'
import { nodeMatchOptions } from 'src/base/nodeMatch/match/nodeMatchOptions'
import type { FindNodeOptions } from 'src/base/nodeFinders/findNodes'
import { createProgramFromCode } from 'src/base/program/createProgramFromCode'
import { findNodeVisitor } from 'src/base/visitors/findNodeVisitor'

export function findNodeInCode<TType extends ts.Node = ts.Node>(
  code: string,
  opt: FindNodeOptions = {},
) {
  const program = createProgramFromCode(code, { fileName: 'file.ts' })
  const sourceFile = program.getSourceFile('file.ts')!
  return findNodeVisitor<TType>(sourceFile, (node) =>
    nodeMatchOptions(node, opt),
  )
}
