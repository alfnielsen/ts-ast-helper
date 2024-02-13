import * as ts from 'typescript'
import type { NodeTypeMap } from 'src/base/nodeMatch/match/nodeMatchType'
import type { FindNodeTypeOptions } from 'src/base/nodeFinders/findOne/findNodeType'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { findNodeTypes } from 'src/base/nodeFinders/findMany/findNodeTypes'

export function findNodeTypesInCode<TType extends ts.Node = ts.Node>(
  code: string,
  type: NodeTypeMap | keyof typeof NodeTypeMap,
  opt: FindNodeTypeOptions = {},
) {
  const sourceFile = createSourceFileFromCode(code)
  return findNodeTypes<TType>(sourceFile, type, opt)
}
