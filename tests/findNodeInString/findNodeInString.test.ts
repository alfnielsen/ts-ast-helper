import { test, expect } from "bun:test"
import * as ts from "typescript"
import findNodeInString from "../../src/findNodeInString"

test("findNodeInString", async () => {
  const base = `
function fooFunc(){
  let foo = 32
}
   
  `

  const node = await findNodeInString(base, {
    name: "foo",
  })

  expect(node).toBeDefined()
  expect(ts.SyntaxKind[node!.kind]).toBe(ts.SyntaxKind[ts.SyntaxKind.VariableDeclaration])
})
