import * as ts from 'typescript'
import { printNode } from 'src/base/printer/printNode'
import { hasModifier } from 'src/base/nodeMatch/hasModifier'
import { getModifiers } from 'src/base/getters/getModifiers'
import { tranformBlockOrSourceFileWithState } from 'src/base/transformers/tranformBlockOrSourceFileWithState'

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
 * @param varStatment ts.VariableStatement
 */
export function transformVariableFunctionToFunction(
  varStatment: ts.VariableStatement,
  sourceFile?: ts.SourceFile,
) {
  const scope = sourceFile ?? varStatment.parent
  if (!scope || (!ts.isSourceFile(scope) && !ts.isBlock(scope))) {
    console.log('scope:\n', printNode(scope))
    throw new Error(
      'Variable Statment is not in a valid scope (SourceFile, Block)',
    )
  }
  let funcRef: ts.FunctionDeclaration | undefined
  // transform the scope / parent:
  tranformBlockOrSourceFileWithState({
    node: scope,
    visitor(node, { parent, context, visitChildern }) {
      if (node !== varStatment) {
        return
      }
      if (!varStatment.declarationList.declarations) {
        throw new Error('variable definition is not a function')
      }
      const funcs = varStatment.declarationList.declarations.map((d, i) => {
        if (!d.initializer) {
          throw new Error('variable definition is not a function')
        }
        if (
          !ts.isFunctionExpression(d.initializer) &&
          !ts.isArrowFunction(d.initializer)
        ) {
          console.log('variable:', printNode(varStatment))
          console.log('variable declaration:', printNode(d))
          console.log('variable initializer:', printNode(d.initializer))
          throw new Error('variable definition is not a function')
        }

        const func = d.initializer
        // transfor modifiers from the variable to the function (export)
        const isExported = hasModifier(varStatment, ts.SyntaxKind.ExportKeyword)
        const modifiers = getModifiers(func)
        if (isExported) {
          modifiers.unshift(
            ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
          )
        }

        funcRef = ts.factory.createFunctionDeclaration(
          modifiers,
          func.asteriskToken,
          d.name as ts.Identifier, //func.name as ts.Identifier,
          func.typeParameters,
          func.parameters,
          func.type,
          func.body && ts.isBlock(func.body)
            ? func.body
            : ts.factory.createBlock([
                ts.factory.createReturnStatement(func.body),
              ]),
        )

        return funcRef
      })
      return funcs[0]
    },
  })
  return funcRef
}
