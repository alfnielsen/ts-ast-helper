import * as ts from 'typescript'
import { hasModifierLikes } from 'src/base/nodeMatch/hasAll/hasModifierLikes'

export function isDefaultExported(node: ts.Node): boolean {
  return hasModifierLikes(
    node,
    ts.SyntaxKind.ExportKeyword,
    ts.SyntaxKind.DefaultKeyword,
  )
}
