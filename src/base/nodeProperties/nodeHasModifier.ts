import * as ts from 'typescript'
import { getIdentifier } from './getIdentifier'

export const getNodeName = (node: ts.Node) => {
  const idenfifier = getIdentifier(node)
  if (idenfifier) {
    return idenfifier.text
  }
}
