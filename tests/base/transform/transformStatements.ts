import * as ts from 'typescript'
import { test, expect } from 'bun:test'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { tranformWithState } from 'src/base/transformers/tranformWithState'
import { transformStatements } from 'src/base/transform/transformStatements'
import { codeIsEquael } from 'tests/tests-util/tests-code-helper'

const code = `
function subAdd(a: number, b: number) {
    return a + b;
}
let add = function addFn(a: number, b: number) {
    const c = 10;
    const d = a + 25;
    return a + b + c;
}
let add2 = function addFn(a: number, b: number) {
  const c = 10;
  const d = a + 25;
  return a + b + c;
}
`
const expectCode = `
function subAdd(a: number, b: number) {
    return a + b;
}
function add(a: number, b: number) {
    const c = 10;
    const d = a + 25;
    return a + b + c;
}
function add2(a: number, b: number) {
  const c = 10;
  const d = a + 25;
  return a + b + c;
}
`

test('test transformStatements', async () => {
  // creat a source file from the code
  const sourceFile = createSourceFileFromCode(code)

  // transform the source file
  const transformedSourceFile = tranformWithState({
    node: sourceFile,
    sourceVisitor(node, { context, visitChildern }) {
      //Start a new lexical environment when beginning to process the source file.
      context.startLexicalEnvironment()

      // visit each node in the file.
      console.log('#### sourceVisitor :: node ####', ts.SyntaxKind[node.kind])
      const updatedNode = visitChildern() as ts.SourceFile

      const baseStatements = updateVariableStatement(updatedNode)

      // End the lexical environment and collect any declarations (function declarations, variable declarations, etc) that were added.
      const declarations = context.endLexicalEnvironment() ?? []
      const statements = [...declarations, ...baseStatements]

      return ts.factory.updateSourceFile(
        node,
        statements,
        node.isDeclarationFile,
        node.referencedFiles,
        node.typeReferenceDirectives,
        node.hasNoDefaultLib,
        node.libReferenceDirectives,
      )
    },
    visitor(blockNode, { context }) {
      console.log('visitor::node', ts.SyntaxKind[blockNode.kind])
      if (!ts.isBlock(blockNode)) {
        return blockNode
      }

      const statements = updateVariableStatement(blockNode)
      if (statements.length === 0) {
        return blockNode
      }
      console.log('new block statements', statements)
      return ts.factory.updateBlock(blockNode, statements)
    },
  })

  function updateVariableStatement(blockNode: ts.Block | ts.SourceFile) {
    return transformStatements(blockNode.statements, (statement, act) => {
      if (!ts.isVariableStatement(statement)) {
        return
      }
      const varStatment = statement
      const varList: ts.VariableDeclaration[] = []
      const functionList: ts.FunctionExpression[] = []
      // collect function expression and variable declaration
      for (const declaration of varStatment.declarationList.declarations) {
        // the initializer is expression after assignment operator
        if (declaration.initializer) {
          if (ts.isFunctionExpression(declaration.initializer)) {
            functionList.push(declaration.initializer)
          } else {
            varList.push(declaration)
          }
        }
      }
      const newFunctionList = functionList.map((functionExpression) =>
        ts.factory.createFunctionDeclaration(
          functionExpression.modifiers,
          functionExpression.asteriskToken,
          functionExpression.name as ts.Identifier,
          functionExpression.typeParameters,
          functionExpression.parameters,
          functionExpression.type,
          functionExpression.body,
        ),
      )
      act.add(...newFunctionList)

      // it means there is no function expression in the variable statement
      if (varList.length === varStatment.declarationList.declarations.length) {
        act.remove()
        return
      }

      // if the varList (non function expression) is empty, return undefined to remove the variable statement node
      if (varList.length === 0) {
        act.remove()
        return
      }
      const newVariableStatement = ts.factory.createVariableStatement(
        varStatment.modifiers,
        ts.factory.createVariableDeclarationList(varList),
      )
      act.replace(newVariableStatement)
    })
  }

  // print the transformed source file
  const printer = ts.createPrinter()
  const result = printer.printFile(transformedSourceFile)

  expect(codeIsEquael(result, expectCode)).toBeTrue()
})
