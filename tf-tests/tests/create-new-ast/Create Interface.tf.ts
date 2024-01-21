import ts from "typescript"

// Creating a printer here, so we can print an TS node
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

const interfaceDeclaration = ts.factory.createInterfaceDeclaration(undefined, "InterfaceDeclaration", [], undefined, [
  ts.factory.createPropertySignature(
    undefined,
    "arrayType",
    undefined,
    ts.factory.createArrayTypeNode(ts.factory.createTypeReferenceNode("number"))
  ),
  ts.factory.createPropertySignature(undefined, "stringType", undefined, ts.factory.createTypeReferenceNode("string")),
])

console.log(
  printer.printNode(ts.EmitHint.Unspecified, interfaceDeclaration, ts.createSourceFile("", "", ts.ScriptTarget.Latest))
)
