import { hasModifierLikes } from 'src/base'
import * as ts from 'typescript'

export function isExported(node: ts.Node): boolean {
  return hasModifierLikes(node, ts.SyntaxKind.ExportKeyword)
}
