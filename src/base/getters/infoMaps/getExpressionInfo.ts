import * as ts from 'typescript'

export type ExpressionInfo = {
  text: string
  start: number
  end: number
  kind: string
}

export function getExpressionInfo(
  node: ts.Expression | ts.ExpressionStatement,
) {
  if (ts.isExpressionStatement(node)) {
    node = node.expression
  }
  return {
    text: node.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
  } satisfies ExpressionInfo
}
