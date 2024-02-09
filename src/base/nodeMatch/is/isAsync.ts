import { hasModifierLikes } from 'src/base'
import * as ts from 'typescript'

export function isAsync(node: ts.Node): boolean {
  return hasModifierLikes(node, ts.SyntaxKind.AsyncKeyword)
}
