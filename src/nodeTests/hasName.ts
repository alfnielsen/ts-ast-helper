import * as ts from "typescript"

type NodeWithTextName = { name: { text: string } }
type NodeWithIdentifier = { idenfifier: { text: string } }

export const doesNodeHasName = (node: ts.Node): node is NodeWithTextName & ts.Node => {
  return (node as unknown as NodeWithTextName).name?.text !== undefined
}
