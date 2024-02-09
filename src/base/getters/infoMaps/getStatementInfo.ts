import * as ts from 'typescript'

export type StatementInfo = {
  text: string
  start: number
  end: number
  kind: string
}

export function getStatementInfo(node: ts.Statement) {
  return {
    text: node.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
  } satisfies StatementInfo
}
