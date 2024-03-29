import * as ts from 'typescript'
import { test, expect } from 'bun:test'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { transformVariableFunctionToFunction } from 'src/base/transformers/specifiedTypes/transformVariableFunctionToFunction'
import { expectCodeIsEquael } from 'tests/tests-util/tests-code-helper'
import { findNodes } from 'src/base/nodeFinders/findNodes'
import { printNode } from 'src/base/printer/printNode'

const globalScopeCode = `
const foo1 = () => {
  const a = 1
  const b = 2
  const c = 3
  return a + b + c
}
export const foo2 = () => {
  const a = 1
  const b = 2
  const c = 3
  const f = () => { }
  return a + b + c
}
const foo3 = async () => {
  const a = 1
  const b = 2
  const c = 3
  return a + b + c
}
export const foo4 = async () => {
  const a = 1
  const b = 2
  const c = 3
  return a + b + c
}
export function foo5(){
  const a = 1
  const b = 2
  const c = 3
  return a + b + c
}
`
const globalScopeExceptedCode = `
function foo1() {
  const a = 1
  const b = 2
  const c = 3
  return a + b + c
}
export function foo2() {
  const a = 1
  const b = 2
  const c = 3
  const f = () => { }
  return a + b + c
}
async function foo3() {
  const a = 1
  const b = 2
  const c = 3
  return a + b + c
}
export async function foo4() {
  const a = 1
  const b = 2
  const c = 3
  return a + b + c
}
`
const blockScopeCode = `
const foo1 = () => {
  let a = 1
  const inner = () => {
    a += a*2
    if( a<100 ) {
      inner()
    }
  }
  inner()
  return a
}
const fooA1 = async () => {
  let a = 1
  const inner = async () => {
    a += a*2
    if( a<100 ) {
      inner()
    }
  }
  await inner()
  return a
}
function foo2() {
  let a = 1
  function inner = () => {
    a += a*2
    if( a<100 ) {
      inner()
    }
  }
  inner()
  return a
}
`
const blockScopeExceptedCode = `
  function inner() {
    a += a * 2
    if( a<100 ) {
      inner()

    }
  }
  async function inner() {
    a += a * 2
    if( a<100 ) {
      inner()

    }
  }

`

test('transformFunctionDeclarationToArrowFunction global scope', async () => {
  // find in global scope
  const sourceFile = createSourceFileFromCode(globalScopeCode)
  const varFuncList = await findNodes<ts.VariableStatement>(sourceFile, {
    kind: 'VariableStatement',
    match(node) {
      return ts.isSourceFile(node.parent)
    },
  })
  let result = ''
  for (let varFunc of varFuncList) {
    const isVariableStatement = ts.isVariableStatement(varFunc!)
    expect(isVariableStatement).toBe(true)
    // Real test:
    const func = transformVariableFunctionToFunction(varFunc!)
    // asserts
    expect(func).toBeDefined()
    const isFunctionDeclaration = ts.isFunctionDeclaration(func!)
    expect(isFunctionDeclaration).toBe(true)
    const funcString = printNode(func!, sourceFile)
    result += funcString + '\n'
  }

  expectCodeIsEquael(result, globalScopeExceptedCode, true)
})

test('transformFunctionDeclarationToArrowFunction block scope', async () => {
  // find in global scope
  const sourceFile = createSourceFileFromCode(blockScopeCode)
  const varFuncList = await findNodes<ts.VariableStatement>(sourceFile, {
    kind: 'VariableStatement',
    match(node) {
      if (!ts.isBlock(node.parent)) {
        // console.log('Not in a block!')
        return false
      }
      if (!ts.isVariableStatement(node)) {
        // console.log('Not VariableStatement!')
        return false
      }
      if (node.declarationList.declarations.length !== 1) {
        // console.log(
        //   `node.declarationList.declarations is not 1! (count: ${node.declarationList.declarations.length} )`,
        // )
        return false
      }
      if (!node.declarationList.declarations[0].initializer) {
        // console.log(`missing initializer`)
        return false
      }

      if (
        !ts.isArrowFunction(node.declarationList.declarations[0].initializer)
      ) {
        // console.log(
        //   `Not a arrowFunction (kind: ${nodeKind(
        //     node.declarationList.declarations[0],
        //   )} )`,
        // )
        return false
      }

      return true
    },
  })
  let result = ''
  expect(varFuncList).toBeDefined()
  expect(varFuncList.length).toBe(2)
  for (let varFunc of varFuncList) {
    const isVariableStatement = ts.isVariableStatement(varFunc!)
    expect(isVariableStatement).toBe(true)
    // Real test:
    const func = transformVariableFunctionToFunction(varFunc!)
    // asserts
    expect(func).toBeDefined()
    const isFunctionDeclaration = ts.isFunctionDeclaration(func!)
    expect(isFunctionDeclaration).toBe(true)
    const funcString = printNode(func!, sourceFile)
    result += funcString + '\n'
  }

  expectCodeIsEquael(result, blockScopeExceptedCode, true)
})
