import * as ts from 'typescript'
import { createProgramFromCode, findIdentifiers } from 'src/base'
import { getSymbolInfo } from 'src/base/getters/infoMaps/getSymbolInfo'
import { getUnsuedImports } from 'src/base/symbol/getUnsuedImports'
import { getImportInfo } from 'src/base/getters/infoMaps/getImportInfo'

const fileName = 'file.ts'
const code1 = `
import foo from 'foo'
import foo1 from 'foo1'
import foo33 from 'foo33'
import { foo34 as foo4 } from 'foo34'
import { foo35 as foo5 } from 'foo35'
const a = 1
const f = foo + 2
function bar(foo: number) {
    return foo
}
function baz() {
    var foo = 1
    var foo33 = 1
    return foo + foo33
}
function qux(foo33: number) {
    let foo2 = foo1 + foo33 + foo5
    return foo2
}

`
const program = createProgramFromCode(code1, { fileName: fileName })
const sourceFile = program.getSourceFile(fileName)
const checker = program.getTypeChecker()

const identifiers = findIdentifiers(sourceFile!)
const symbols = identifiers
  .map((id) => ({
    symbol: checker.getSymbolAtLocation(id),
    node: id,
  }))
  .filter((symbol) => symbol.symbol)
const symbolInfos = symbols.map((symbol) => {
  if (!symbol.symbol) {
    throw new Error(`Symbol not found for ${symbol.node.getText()}`)
  }
  return getSymbolInfo(symbol.symbol, symbol.node)
})
console.log(`------ Source ------`)
console.log(code1)
const unusedImports = getUnsuedImports(sourceFile!)
const unusedImportsInfo = unusedImports.map(getImportInfo)
console.log(`------ Unused Imports ------`)
console.log(JSON.stringify(unusedImportsInfo, null, 2))
