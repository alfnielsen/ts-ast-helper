import { printNode } from 'src/base/printer/printNode'
import { tranformSourceFileWithState } from 'src/base/transformers/tranformSourceFileWithState'
import { tranformWithState } from 'src/base/transformers/tranformWithState'
import { transformCodeToSourceFile } from 'src/base/transformers/transformCodeToSourceFile'
import { transformStatements } from 'src/base/transformers/transformStatements'
import * as ts from 'typescript'

/**
 * Transform a VariableStatement with one varibleDefinition that hold a function, \
 * and return a functionDeclaration version. \
 * NOTE: \
 * The transformed function is not part of a lexicalEnvironment \
 * (It does not have positions and therefor methods like 'getText()' will not work) \
 *
 * To fix that need to transform the entire SourceFile (with a transformer), \
 * and use laxical environments, like context.startLexicalEnvironment()
 *
 * There are a couple of helper methods that do this like: \
 *  - tranformSourceFileWithState
 *
 * @example
 * var foo = () =>{}
 * function foo(){}
 * @param varStatment
 */
export function transformVariableFunctionToFunction(
  varStatment: ts.VariableStatement,
) {
  const scope = varStatment.parent
  if (!scope || !ts.isSourceFile(scope)) {
    throw new Error(
      'Variable Statment is not in a valid scope (SourceFile or Block)',
    )
  }
  let ref: ts.FunctionDeclaration | undefined
  // transform the scope / parent:
  let updatedSource = tranformSourceFileWithState({
    node: scope,
    visitor(node, { parent, context, visitChildern }) {
      if (node !== varStatment) {
        return
      }
      console.log('node.kind:', ts.SyntaxKind[node.kind])
      console.log('match object ref::', node === varStatment)
      if (!varStatment.declarationList.declarations) {
        throw new Error('variable definition is not a function')
      }
      const funcs = varStatment.declarationList.declarations.map((d, i) => {
        if (!d.initializer) {
          throw new Error('variable definition is not a function')
        }
        console.log('t1:', ts.SyntaxKind[d.initializer.kind])

        if (
          !ts.isFunctionExpression(d.initializer) &&
          !ts.isArrowFunction(d.initializer)
        ) {
          throw new Error('variable definition is not a function')
        }

        const func = d.initializer
        ref = ts.factory.createFunctionDeclaration(
          func.modifiers,
          func.asteriskToken,
          func.name as ts.Identifier,
          func.typeParameters,
          func.parameters,
          func.type,
          func.body && ts.isBlock(func.body)
            ? func.body
            : ts.factory.createBlock([
                ts.factory.createReturnStatement(func.body),
              ]),
        )
        console.log('ref:', ts.SyntaxKind[ref.kind])
        return ref
      })
      console.log('funcs[0]:', ts.SyntaxKind[funcs[0].kind])
      console.log('------------------')
      printNode(funcs[0], scope)
      console.log('------------------')
      return funcs[0]
    },
  })
  console.log('updatedSource:\n', updatedSource.getText())
  return ref
}
