import * as ts from 'typescript'
import { getName } from '../../base/getters/nodePropertyGetters/getName'
import { printNode } from '../../base/printer/printNode'
import { tranformWithState } from '../../base/transformers/tranformWithState'

// Replace functionDeclaration with a arrow functon assigned to a variableDeclaration (with the same name)
export const transformFunctionDeclarationToArrowFunction = (
  funcNode: ts.FunctionDeclaration,
) => {
  // extract
  const name = getName(funcNode)
  if (!name) {
    throw new Error('Could not get name of function declaration!')
  }

  tranformWithState({
    node: funcNode,
    visitor(node, { context }) {
      if (ts.isFunctionDeclaration(node)) {
        // const variableStatement = createVariableStatement(funcNode)
        // return variableStatement
      }
      return node
    },
  })

  const modifiers = funcNode.modifiers?.filter(
    (modifier) =>
      ts.isModifier(modifier) && modifier.kind !== ts.SyntaxKind.ExportKeyword,
  ) as ts.Modifier[] | undefined
  const exportModifier = funcNode.modifiers?.find(
    (modifier) =>
      ts.isModifier(modifier) && modifier.kind === ts.SyntaxKind.ExportKeyword,
  ) as ts.Modifier | undefined
  const typeParameters = funcNode.typeParameters
  const parameters = funcNode.parameters
  const type = funcNode.type
  const body = funcNode.body ?? ts.factory.createBlock([])
  // get statements from body
  const statements = body.statements.map((statement) => {
    if (ts.isReturnStatement(statement)) {
      return ts.factory.createReturnStatement(statement.expression)
    }
    return statement
  })

  console.log('----------------Original Body-------------------')

  const bb1 = printNode(body)
  console.log(bb1)
  console.log('-----------------------------------')

  console.log('------------------------------------------------------')

  const arrowFunction = ts.factory.createArrowFunction(
    modifiers,
    typeParameters,
    parameters,
    type,
    ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    ts.factory.createBlock([], true),
  )
  console.log('----------------A1-------------------')

  const a1 = ts.factory.updateArrowFunction(
    arrowFunction,
    modifiers,
    typeParameters,
    parameters,
    type,
    ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    ts.factory.createBlock([], true),
  )

  const at1 = printNode(a1)
  console.log(at1)
  console.log('-----------------------------------')

  // transform to arrow function
  // const arrowFunction = ts.factory.createArrowFunction(modifiers, typeParameters, parameters, type, undefined, body)
  const varModifier: ts.Modifier[] = []
  if (exportModifier) {
    varModifier.unshift(exportModifier)
  }

  const funcTransformer = (cxt: ts.TransformationContext) => {
    return (node: ts.Node) => {
      console.log('node:')
      console.log(node)
      return node
    }
  }
  // const t1 = ts.transform(funcNode, [
  //   (cxt: ts.TransformationContext) => {
  //     cxt.factory.up
  //     console.log("node:")
  //     console.log(node)
  //     return node
  //   },
  // ])

  const variableDeclaration = ts.factory.createVariableDeclaration(
    name,
    undefined,
    undefined,
    arrowFunction,
  )
  const variableDeclarationList = ts.factory.createVariableDeclarationList(
    [variableDeclaration],
    ts.NodeFlags.Const,
  )
  const variableStatement = ts.factory.createVariableStatement(
    varModifier,
    variableDeclarationList,
  )
  console.log('variableStatement:')
  // console.log(variableStatement)

  const t1 = printNode(ts.factory.createBlock(statements, true))
  console.log(t1)
  const sourceFile = printNode(arrowFunction)
  console.log(sourceFile)

  console.log('-----------------------------------')

  // const v = variableStatement.getText(ts.factory.createSourceFile([variableStatement], sf, ts.NodeFlags.None))

  return variableStatement
}
