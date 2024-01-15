import * as ts from "typescript"
import { getNodeName } from "../nodeUtils/getNodeName"

// Replace functionDeclaration with a arrow functon assigned to a variableDeclaration (with the same name)
export const replaceFunctionDeclarationWithArrowFunction = (funcNode: ts.FunctionDeclaration) => {
  // extract
  const name = getNodeName(funcNode)
  if (!name) {
    throw new Error("Could not get name of function declaration!")
  }

  const modifiers = funcNode.modifiers?.filter(
    modifier => ts.isModifier(modifier) && modifier.kind !== ts.SyntaxKind.ExportKeyword
  ) as ts.Modifier[] | undefined
  const exportModifier = funcNode.modifiers?.find(
    modifier => ts.isModifier(modifier) && modifier.kind === ts.SyntaxKind.ExportKeyword
  ) as ts.Modifier | undefined
  const typeParameters = funcNode.typeParameters
  const parameters = funcNode.parameters
  const type = funcNode.type
  const body = funcNode.body ?? ts.factory.createBlock([])

  // transform to arrow function
  const arrowFunction = ts.factory.createArrowFunction(modifiers, typeParameters, parameters, type, undefined, body)
  const varModifier: ts.Modifier[] = []
  if (exportModifier) {
    varModifier.unshift(exportModifier)
  }
  const variableDeclaration = ts.factory.createVariableDeclaration(name, undefined, undefined, arrowFunction)
  const variableDeclarationList = ts.factory.createVariableDeclarationList([variableDeclaration], ts.NodeFlags.Const)
  const variableStatement = ts.factory.createVariableStatement(varModifier, variableDeclarationList)

  return variableStatement
}
