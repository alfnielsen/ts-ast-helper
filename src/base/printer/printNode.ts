import * as ts from 'typescript'
export function printNode(node: ts.Node, sourceFile?: ts.SourceFile) {
  const printer = ts.createPrinter()
  sourceFile =
    sourceFile ??
    node.getSourceFile() ??
    ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)
  const result = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)
  return result
}
