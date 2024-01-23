import * as ts from 'typescript'

export function transformBlock(blockNode: ts.Block) {
  const statements = updateVariableStatement(blockNode)
  if (statements.length === 0) {
    return blockNode
  }
  console.log('new block statements', statements)
  return ts.factory.updateBlock(blockNode, statements)
}

function updateVariableStatement(blockNode: ts.Block | ts.SourceFile) {
  const statements: ts.Statement[] = []
  for (const statement of blockNode.statements) {
    if (!ts.isVariableStatement(statement)) {
      statements.push(statement)
      continue
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
    for (const functionExpression of functionList) {
      // create function declaration out of function expression
      const functionDeclaration = ts.factory.createFunctionDeclaration(
        functionExpression.modifiers,
        functionExpression.asteriskToken,
        functionExpression.name as ts.Identifier,
        functionExpression.typeParameters,
        functionExpression.parameters,
        functionExpression.type,
        functionExpression.body,
      )

      statements.push(functionDeclaration)
    }
    // it means there is no function expression in the variable statement
    if (varList.length === varStatment.declarationList.declarations.length) {
      continue
    }

    // if the varList (non function expression) is empty, return undefined to remove the variable statement node
    if (varList.length === 0) {
      continue
    }
    statements.push(
      ts.factory.createVariableStatement(
        varStatment.modifiers,
        ts.factory.createVariableDeclarationList(varList),
      ),
    )
  }
  return statements
}

// print the transformed source file
const printer = ts.createPrinter()
const result = printer.printFile(transformedSourceFile)
console.log('Alf Custom Transformer')
console.log('======================')
console.log(result)
