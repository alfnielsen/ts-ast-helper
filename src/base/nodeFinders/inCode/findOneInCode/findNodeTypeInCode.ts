import * as ts from 'typescript'
import type { NodeTypeMap } from 'src/base/nodeMatch/match/nodeMatchType'
import {
  findNodeType,
  type FindNodeTypeOptions,
} from 'src/base/nodeFinders/findOne/findNodeType'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'

export function findNodeTypeInCode<TType extends ts.Node = ts.Node>(
  code: string,
  type: NodeTypeMap | keyof typeof NodeTypeMap,
  opt: FindNodeTypeOptions = {},
) {
  const sourceFile = createSourceFileFromCode(code)
  return findNodeType<TType>(sourceFile, type, opt)
}
