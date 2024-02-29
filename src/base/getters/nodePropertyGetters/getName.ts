import * as ts from 'typescript'
import { getIdentifier } from './getIdentifier'

export const getName = (node: ts.Node) => {
  const nameProp = (node as unknown as { name: any }).name as
    | ts.Identifier
    | undefined
  if (nameProp) {
    return nameProp.text
  }
  const idenfifier = getIdentifier(node)
  if (idenfifier) {
    return idenfifier.text
  }
}
