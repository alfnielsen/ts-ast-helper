import * as ts from 'typescript'
import { createProgramFromCode, findIdentifiers } from 'src/base'
import { getSymbolInfo } from 'src/base/getters/infoMaps/getSymbolInfo'

const fileName = 'file.ts'
const code1 = `
import foo from 'foo'
import foo33 from 'foo33'
const a = 1
foo += 2
function bar(foo: number) {
    return foo
}
function baz() {
    var foo = 1
    return foo
}
function qux() {
    let foo2 = foo
    return foo2
}

`
const program = createProgramFromCode(code1, { fileName: fileName })
const sourceFile = program.getSourceFile(fileName)
const checker = program.getTypeChecker()

const identifiers = findIdentifiers(sourceFile!)
const symbols = identifiers.map((id) => ({
  symbol: checker.getSymbolAtLocation(id),
  node: id,
}))
const symbolInfos = symbols.map((symbol) =>
  getSymbolInfo(symbol.symbol!, symbol.node),
)
// map only declarations

console.log(`------ Symbols ------`)
console.log(JSON.stringify(symbolInfos, null, 2))
