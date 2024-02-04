import * as ts from 'typescript'

function transformCode(
  code: string,
  transform: (sourceFile: ts.SourceFile) => ts.SourceFile,
) {
  // creat a source file from the code
  const sourceFile = ts.createSourceFile(
    'file.ts',
    code,
    ts.ScriptTarget.ES2015,
    true,
  )
  // transform the source file
  const transformedSourceFile = transform(sourceFile)

  // print the transformed source file
  const printer = ts.createPrinter()
  const result = printer.printFile(transformedSourceFile)
  return result
}

// run the transformer on the source file
function transform(sourceFile: ts.SourceFile) {
  const result = ts.transform(sourceFile, [transformer])
  const transformedSourceFile = result.transformed[0] as ts.SourceFile
  return transformedSourceFile
}

const code = `
        let add = function addFn(a: number, b: number) {
            const c = 10;
            const d = a + 25;
            return a + b + c;
        }
    
        function subFn(a: number, b: number) {
            return a - b;
        }
    `

export function transformer(context: ts.TransformationContext) {
  const visit: ts.Visitor = (node) => {
    if (ts.isVariableStatement(node)) {
      const varList: ts.VariableDeclaration[] = []
      const functionList: ts.FunctionExpression[] = []

      // collect function expression and variable declaration
      for (const declaration of node.declarationList.declarations) {
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

        // hoist the function declaration to the top of the containing scope (file)
        context.hoistFunctionDeclaration(functionDeclaration)
      }

      // if the varList (non function expression) is same as the original variable statement, return the node as is.
      // it means there is no function expression in the variable statement
      if (varList.length === node.declarationList.declarations.length) {
        return node
      }

      // if the varList (non function expression) is empty, return undefined to remove the variable statement node
      if (varList.length === 0) {
        return undefined
      }

      return ts.factory.updateVariableStatement(
        node,
        node.modifiers,
        ts.factory.createVariableDeclarationList(varList),
      )
    }

    return ts.visitEachChild(node, visit, context)
  }

  return (node: ts.SourceFile) => {
    // Start a new lexical environment when beginning to process the source file.
    context.startLexicalEnvironment()

    // visit each node in the file.
    const updatedNode = ts.visitEachChild(node, visit, context)

    // End the lexical environment and collect any declarations (function declarations, variable declarations, etc) that were added.
    const declarations = context.endLexicalEnvironment() ?? []
    const statements = [...declarations, ...updatedNode.statements]

    return ts.factory.updateSourceFile(
      node,
      statements,
      node.isDeclarationFile,
      node.referencedFiles,
      node.typeReferenceDirectives,
      node.hasNoDefaultLib,
      node.libReferenceDirectives,
    )
  }
}
