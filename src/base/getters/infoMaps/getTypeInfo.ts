import * as ts from 'typescript'

export type TypeInfo = {
  text: string
  start: number
  end: number
  kind: string
}

export function getTypeInfo(node: ts.TypeNode) {
  return {
    text: node.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
  } satisfies TypeInfo
}
