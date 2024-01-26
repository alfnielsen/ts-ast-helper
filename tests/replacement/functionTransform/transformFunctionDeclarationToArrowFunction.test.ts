import * as ts from "typescript"
import { test, expect } from "bun:test"
import findNodeInString from "../../../src/findNodeInString"
import { replaceFunctionDeclarationWithArrowFunction } from "../../../src/transforms/transformFunctionDeclarationToArrowFunction"
import { printNode } from "../../../src/base/printer/printNode"

test("transformFunctionDeclarationToArrowFunction", async () => {
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
  const trFooString = printNode(trFoo)
  const fooExcept = `
  const foo = () => {
    const a = 1;
    const b = 2;
    const c = 3;
    return a + b + c;
}
`.trim()
  expect(trFooString).toBe(fooExcept)

  const asyncFoo = await findNodeInString<ts.FunctionDeclaration>(code, {
    kind: "FunctionDeclaration",
    name: "asyncFoo",
  })
  const trAsyncFoo = replaceFunctionDeclarationWithArrowFunction(asyncFoo!)
  const trAsyncFooString = printNode(trAsyncFoo)
  const asyncFooExcept = `
const asyncFoo = async () => {
  const a = 1;
  const b = 2;
  const c = 3;
  return a + b + c;
}
`.trim()
  expect(trAsyncFooString).toBe(asyncFooExcept)

  const exportFoo = await findNodeInString<ts.FunctionDeclaration>(code, {
    kind: "FunctionDeclaration",
    name: "exportFoo",
  })
  const trExportFoo = replaceFunctionDeclarationWithArrowFunction(exportFoo!)
  const trExportFooString = printNode(trExportFoo)
  const exportFooExcept = `
export const exportFoo = () => {
  const a = 1;
  const b = 2;
  const c = 3;
  return a + b + c;
}
`.trim()
  expect(trExportFooString).toBe(exportFooExcept)

  const exportAsyncFoo = await findNodeInString<ts.FunctionDeclaration>(code, {
    kind: "FunctionDeclaration",
    name: "exportAsyncFoo",
  })
  const trExportAsyncFoo = replaceFunctionDeclarationWithArrowFunction(exportAsyncFoo!)

  const trExportAsyncFooString = printNode(trExportAsyncFoo)
  const exportAsyncFooExcept = `
  export const exportAsyncFoo = async () => {
    const a = 1;
    const b = 2;
    const c = 3;
    return a + b + c;
  }
  `.trim()
  expect(trExportAsyncFooString).toBe(exportAsyncFooExcept)
})