import * as ts from 'typescript'
import { nodeMatchOptions } from 'src/base/nodeFinders/nodeMatchOptions'
import type { FindNodeOptions } from 'src/base/nodeFinders/findNodes'
import { createProgramFromString } from 'src/base/program/createProgramFromString'
import { findNodeVisitor } from 'src/base'

export function findNodeInCode<TType extends ts.Node = ts.Node>(
  code: string,
  opt: FindNodeOptions = {},
) {
  const program = createProgramFromString(code, { fileName: 'file.ts' })
  const sourceFile = program.getSourceFile('file.ts')!
  return findNodeVisitor<TType>(sourceFile, (node) =>
    nodeMatchOptions(node, opt),
  )
}
