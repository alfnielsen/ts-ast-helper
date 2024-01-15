import * as ts from "typescript"
import findNodeInString from "../../../src/findNodeInString"
import { replaceFunctionDeclarationWithArrowFunction } from "../../../src/replacement/replaceFunctionDeclarationWithArrowFunction"
import { printNode } from "../../../src/printer/printNode"

const code = `
import * as ts from "typescript"

function foo() {
    const a = 1
    const b = 2
    const c = 3
    return a + b + c
}
async function asyncFoo() {
    const a = 1
    const b = 2
    const c = 3
    return a + b + c
}

export function exportFoo() {
    const a = 1
    const b = 2
    const c = 3
    return a + b + c
}
export async function exportAsyncFoo() {
    const a = 1
    const b = 2
    const c = 3
    return a + b + c
}

`
const foo = await findNodeInString<ts.FunctionDeclaration>(code, {
  kind: "FunctionDeclaration",
  name: "foo",
})
const trFoo = replaceFunctionDeclarationWithArrowFunction(foo!)
console.log("---------- fooText ----------")
console.log(foo?.getFullText())
console.log(printNode(trFoo))

const asyncFoo = await findNodeInString<ts.FunctionDeclaration>(code, {
  kind: "FunctionDeclaration",
  name: "asyncFoo",
})
const trAsyncFoo = replaceFunctionDeclarationWithArrowFunction(asyncFoo!)
console.log("---------- asyncFooText ----------")
console.log(asyncFoo?.getFullText())
console.log(printNode(trAsyncFoo))
//console.log(trAsyncFoo?.getFullText())

const exportFoo = await findNodeInString<ts.FunctionDeclaration>(code, {
  kind: "FunctionDeclaration",
  name: "exportFoo",
})
const trExportFoo = replaceFunctionDeclarationWithArrowFunction(exportFoo!)

console.log("---------- exportFooText ----------")
console.log(exportFoo?.getFullText())
console.log(printNode(trExportFoo))

const exportAsyncFoo = await findNodeInString<ts.FunctionDeclaration>(code, {
  kind: "FunctionDeclaration",
  name: "exportAsyncFoo",
})
const trExportAsyncFoo = replaceFunctionDeclarationWithArrowFunction(exportAsyncFoo!)
console.log("---------- exportAsyncFooText ----------")
console.log(exportAsyncFoo?.getFullText())
console.log(printNode(trExportAsyncFoo))
