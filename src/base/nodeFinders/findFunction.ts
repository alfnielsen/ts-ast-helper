import * as ts from 'typescript'
import type { FindNodeOptions } from 'src/base/nodeFinders/findNode'

export type FindFunctionOptions = Omit<
  FindNodeOptions,
  'kind' | 'oneOfKinds'
> & {
  isVariableDeclaration?: true
}

export function findFunction(rootNode: ts.Node, opt: FindFunctionOptions = {}) {
  const findFunctionOptions = {
    ...opt,
    kind: ts.SyntaxKind.FunctionDeclaration,
  }
  return findFunction(rootNode, findFunctionOptions)
}
