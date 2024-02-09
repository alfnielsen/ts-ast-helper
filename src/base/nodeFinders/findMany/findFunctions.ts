import * as ts from 'typescript'
import { type FindNodeTypeOptions } from 'src/base/nodeFinders/findOne/findNodeType'
import { findNodeTypes } from 'src/base/nodeFinders/findMany/findNodeTypes'
import { findNodes } from 'src/base/nodeFinders/findNodes'
import { transformVariableFunctionToFunction } from 'src/base/transformers/specifiedTypes/transformVariableFunctionToFunction'

export type FindFunctionOptions = FindNodeTypeOptions & {
  includeVariableFunction?: boolean /** defatult: true */
}
/**
 * Find any function under the rootNode. \
 * (This dont match arrow-function unless it's it hold by a variable) \

 * This will find FunctionDeclaration 'function Foo(){}' \
 * and variables that holds a function or arrow-function (as a FunctionDeclaration).
 * 
 * @example
 *   function Foo(){}
 *    const foo = ()=>{}
 * @param rootNode
 * @param opt
 */
export function findFunctions(
  rootNode: ts.Node,
  opt: FindFunctionOptions = {},
) {
  const { includeVariableFunction = true, ...findNodeOpt } = opt
  const functions = findNodeTypes<ts.FunctionDeclaration>(
    rootNode,
    'Function',
    findNodeOpt,
  )
  if (includeVariableFunction) {
    const variables = findNodes<ts.VariableStatement>(rootNode, {
      match(node) {
        if (!ts.isVariableStatement(node)) {
          return false
        }
        console.log('--------MATCH----------')
        console.log(node.getText())
        return node.declarationList.declarations.some(
          (d) => d.initializer && ts.isFunctionExpression(d.initializer),
        )
      },
    })
    // con
    const funcs = variables
      ?.flatMap((v) => transformVariableFunctionToFunction(v))
      .filter((x) => !!x) as ts.FunctionDeclaration[]
    functions.push(...funcs)
  }
  return functions
}
