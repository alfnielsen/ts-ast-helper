import { test, expect } from "bun:test"
import * as ts from "typescript"
import findNodeInString from "../../src/findNodeInString"
import { getNodeName } from "../../src/nodeUtils/getNodeName"

test("findNodeInString - option: name", async () => {
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

test("findNodeInString - option: kind", async () => {
  const base = `
import { foo } from "foo"
function fooFunc(){
  let foo = 32
}

   
  `
  // string
  const node = await findNodeInString(base, {
    kind: "FunctionDeclaration",
  })
  expect(node).toBeDefined()
  expect(ts.SyntaxKind[node!.kind]).toBe(ts.SyntaxKind[ts.SyntaxKind.FunctionDeclaration])
  // ts.SyntaxKind
  const nodeSyn = await findNodeInString(base, {
    kind: ts.SyntaxKind.FunctionDeclaration,
  })
  expect(nodeSyn).toBeDefined()
  expect(ts.SyntaxKind[nodeSyn!.kind]).toBe(ts.SyntaxKind[ts.SyntaxKind.FunctionDeclaration])
  // array
  const nodeArray = await findNodeInString(base, {
    kind: ["FunctionDeclaration", "ImportDeclaration"],
  })
  expect(nodeArray).toBeDefined()
  expect(ts.SyntaxKind[nodeArray!.kind]).toBe(ts.SyntaxKind[ts.SyntaxKind.ImportDeclaration])
})

test("findNodeInString - option: match", async () => {
  const base = `
function fooFunc(){
  let foo = 32
}
   
  `

  const node = await findNodeInString(base, {
    kind: "FunctionDeclaration",
    match: /let.*=\s+32/,
  })

  expect(node).toBeDefined()
  expect(ts.SyntaxKind[node!.kind]).toBe(ts.SyntaxKind[ts.SyntaxKind.FunctionDeclaration])
})

test("findNodeInString - option: must", async () => {
  const base = `
function fooFunc(){
  let foo = 32
}
   
  `

  const node = await findNodeInString(base, {
    must: ({ node }) => {
      if (node.kind !== ts.SyntaxKind.FunctionDeclaration) {
        return false
      }
      const name = getNodeName(node)
      if (!name || name !== "fooFunc") {
        return false
      }
      return true
    },
  })

  expect(node).toBeDefined()
  expect(ts.SyntaxKind[node!.kind]).toBe(ts.SyntaxKind[ts.SyntaxKind.FunctionDeclaration])

  const node2 = await findNodeInString(base, {
    must: ({ node }) => {
      if (node.kind !== ts.SyntaxKind.FunctionDeclaration) {
        return false
      }
      const name = getNodeName(node)
      if (!name || name !== "__fooFunc") {
        return false
      }
      return true
    },
  })

  expect(node2).toBeUndefined()
})

test("findNodeInString - option: not", async () => {
  const base = `
function fooFunc(){
  let foo = 32
}

function fooFunc2(){}
   
  `

  const node = await findNodeInString(base, {
    name: /^foo/,
    not: ({ node }) => {
      return node.kind === ts.SyntaxKind.FunctionDeclaration
    },
  })

  expect(node).toBeDefined()
  expect(ts.SyntaxKind[node!.kind]).toBe(ts.SyntaxKind[ts.SyntaxKind.VariableDeclaration])
  expect(getNodeName(node!)).toBe("foo")
})

test("findNodeInString - option: After", async () => {
  const base = `//345678910
function fooFunc(){
  let foo = 32
}

function fooFunc2(){}
   
  `

  const node = await findNodeInString(base, {
    name: /^foo/,
    startAfter: 20,
  })

  expect(node).toBeDefined()
  expect(ts.SyntaxKind[node!.kind]).toBe(ts.SyntaxKind[ts.SyntaxKind.VariableDeclaration])
  expect(getNodeName(node!)).toBe("foo")
})
