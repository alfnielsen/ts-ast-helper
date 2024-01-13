import * as ts from "typescript"

export function getIdentifier(node: ts.Node) {
  const identifier = node as unknown as { identifier: { text: string } }
  return identifier.identifier.text
  return children
}
