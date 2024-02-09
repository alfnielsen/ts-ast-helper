import * as ts from 'typescript'
import { getAstChildren } from 'src/base/getters/nodePropertyGetters/getAstChildren'

export const getParameters = (node: ts.Node): ts.ParameterDeclaration[] => {
  const children = getAstChildren(node)
  const parameters = children.filter((child) =>
    ts.isParameter(child),
  ) as ts.ParameterDeclaration[]
  return parameters
}
