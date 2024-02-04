import * as ts from 'typescript'
import { printNode } from 'src/base/printer/printNode'
import { getModifiers } from 'src/base/getters/getModifiers'
import { tranformBlockOrSourceFileWithState } from 'src/base/transformers/tranformBlockOrSourceFileWithState'
import { nodeKind } from 'src/base/printer/nodeKind'
import { getAstChildren } from 'src/base/getters/getAstChildren'
import { printSimpleAst } from 'src/base/printer/printSimpleAst'
import { getGrandChildren } from 'src/nodeUtils/getGrandChildren'

/**
 * NOTE: In Development \
 * (known issues: missing async after transformaion!) \
 * \
 * Transform a functionDeclaration and return a VariableStatement with one varibleDefinition that hold a function. \
 * NOTE: \
 * The transformed function is not part of a lexicalEnvironment \
 * (It does not have positions and therefor methods like 'getText()' will not work)
 *
 * To fix that need to transform the entire SourceFile (with a transformer), \
 * and use laxical environments, like context.startLexicalEnvironment()
 *
 * There are a couple of helper methods that do this like:
 *  - tranformSourceFileWithState
 *
 * @example
 * function foo(){}
 * var foo = () =>{}
 * @param functionDeclaration ts.FunctionDeclaration
 */
export function transformFunctionToVariableFunction(
  functionDeclaration: ts.FunctionDeclaration,
  sourceFile?: ts.SourceFile,
) {
  const scope = sourceFile ?? functionDeclaration.parent
  if (!scope || (!ts.isSourceFile(scope) && !ts.isBlock(scope))) {
    console.log('scope:\n', printNode(scope))
    throw new Error(
      'Variable Statment is not in a valid scope (SourceFile, Block)',
    )
  }

  if (!functionDeclaration.name) {
    console.log('scope:\n', printNode(functionDeclaration))
    throw new Error(
      'functionDeclaration most have a name for translation to variable',
    )
  }

  let varRef: ts.VariableStatement | undefined
  // transform the scope / parent:
  tranformBlockOrSourceFileWithState({
    node: scope,
    visitor(node, { parent, context, visitChildern }) {
      if (node !== functionDeclaration) {
        return
      }
      // create variable statment with one declarations that hold an arrow function
      const varModifiers: ts.Modifier[] = []
      const funcModifiers = getModifiers(functionDeclaration)
      const astChildren = getAstChildren(functionDeclaration)
      const grandChildren = getGrandChildren(functionDeclaration)

      console.log(`
      --------------------------------------------      
        Name: ${functionDeclaration.name?.text},
        Context:
        ${functionDeclaration.getText()}

        Ast:
        ${!!functionDeclaration}
        ${functionDeclaration.kind}
        ${nodeKind(functionDeclaration)}
        ${printSimpleAst(functionDeclaration)}

        astChildren:
        ${astChildren.map((c) => nodeKind(c))}

        grandChildren:
        ${grandChildren.map((c) => nodeKind(c))}

        getChildren:
        ${functionDeclaration.getChildren().map((c) => nodeKind(c))}
      --------------------------------------------
      `)

      const isExportedIndex = funcModifiers.findIndex(
        (m) => m.kind === ts.SyntaxKind.ExportKeyword,
      )
      if (isExportedIndex >= 0) {
        funcModifiers.splice(isExportedIndex, 1)
        varModifiers.push(
          ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
        )
      }
      console.log(
        functionDeclaration.name?.text,
        '\n',
        functionDeclaration.getText(),
        '\nfuncModifiers',
        funcModifiers.map((m) => nodeKind(m)),
        '\nvarModifiers',
        varModifiers.map((m) => nodeKind(m)),
      )
      varRef = ts.factory.createVariableStatement(
        varModifiers,
        ts.factory.createVariableDeclarationList(
          [
            ts.factory.createVariableDeclaration(
              functionDeclaration.name!,
              undefined,
              undefined,
              ts.factory.createArrowFunction(
                funcModifiers,
                functionDeclaration.typeParameters,
                functionDeclaration.parameters,
                undefined,
                undefined,
                functionDeclaration.body!,
                // func.body && ts.isBlock(func.body)
                // ? func.body
                // : ts.factory.createBlock([
                //     ts.factory.createReturnStatement(func.body),
                //   ]),
              ),
            ),
          ],
          ts.NodeFlags.Const, // | ts.NodeFlags.Constant,
        ),
      )
      return varRef
    },
  })
  return varRef
}
