import * as ts from "typescript"

const src = ctx.sourceFile
const text = src.getFullText()
let previousCommentPos = -1
const visit = <T extends ts.Node>(node: T): T => {
  if (ts.isSourceFile(node)) return ts.visitEachChild(node, visit, ctx)
  ts.forEachLeadingCommentRange(text, node.getFullStart(), (pos, end, kind, hasTrailingNewLine) => {
    if (pos === previousCommentPos) return
    const commentContent =
      kind === ts.SyntaxKind.MultiLineCommentTrivia ? text.slice(pos + 2, end - 2) : text.slice(pos + 2, end)
    src.text = text.slice(0, pos).padEnd(end, " ") + text.slice(end)
    ts.addSyntheticLeadingComment(node, kind, commentContent.toUpperCase(), hasTrailingNewLine)
    previousCommentPos = pos
  })
  return ts.visitEachChild(node, visit, ctx)
}
return visit(src)
