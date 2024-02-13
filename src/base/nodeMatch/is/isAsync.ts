import * as ts from 'typescript'
import { hasModifierLikes } from 'src/base/nodeMatch/hasAll/hasModifierLikes'

export function isAsync(node: ts.Node): boolean {
  return hasModifierLikes(node, ts.SyntaxKind.AsyncKeyword)
}
