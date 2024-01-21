import * as ts from 'typescript'

export function printSourceFile(sourceFile: ts.SourceFile) {
  const printer = ts.createPrinter()
  const result = printer.printFile(sourceFile)
  return result
}
