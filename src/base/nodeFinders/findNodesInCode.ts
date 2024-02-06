import * as ts from 'typescript'
import { nodeMatchOptions } from 'src/base/nodeFinders/nodeMatchOptions'
import { findNodesVisitor } from 'src/base/visitors/findNodesVisitor'
import type { FindNodeOptions } from 'src/base/nodeFinders/findNodes'
import { createProgramFromString } from 'src/base/program/createProgramFromString'

export function findNodesInCode<TType extends ts.Node = ts.Node>(
  code: string,
  opt: FindNodeOptions = {},
) {
  const program = createProgramFromString(code, { fileName: 'file.ts' })
  const sourceFile = program.getSourceFile('file.ts')!
  return findNodesVisitor<TType>(sourceFile, (node) =>
    nodeMatchOptions(node, opt),
  )
}
