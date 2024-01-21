import ts from "typescript"

// Creating a printer here, so we can print an TS node
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

const obj = ts.factory.createObjectLiteralExpression([
  ts.factory.createPropertyAssignment("firstKey", ts.factory.createStringLiteral("string expression")),
  ts.factory.createPropertyAssignment("secondKey", ts.factory.createNumericLiteral(0)),
])

console.log(printer.printNode(ts.EmitHint.Unspecified, obj, ts.createSourceFile("", "", ts.ScriptTarget.Latest)))
