import * as ts from 'typescript'

export function transformer(
  context: ts.TransformationContext,
  predicate: (
    node: ts.Node,
    parent: ts.Node,
    ancestors: ts.Node[],
  ) => ts.Node | undefined,
) {
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
