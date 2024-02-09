import { hasModifierLikes } from 'src/base'
import * as ts from 'typescript'

export function isDefaultExported(node: ts.Node): boolean {
  return hasModifierLikes(
    node,
    ts.SyntaxKind.ExportKeyword,
    ts.SyntaxKind.DefaultKeyword,
  )
}
