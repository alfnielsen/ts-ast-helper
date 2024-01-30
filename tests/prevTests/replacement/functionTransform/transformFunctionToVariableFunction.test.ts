import * as ts from 'typescript'
import { test, expect } from 'bun:test'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { expectCodeIsEquael } from 'tests/tests-util/tests-code-helper'
import { findNodes } from 'src/base/nodeFinders/findNodes'
import { printNode } from 'src/base/printer/printNode'
import { transformFunctionToVariableFunction } from 'src/base/transformers/specifiedTypes/transformFunctionToVariableFunction'

const globalScopeCode = `
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
export foo5 = () => {
  const a = 1
  const b = 2
  const c = 3
  return a + b + c
}
`
const globalScopeExceptedCode = `
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

`
const blockScopeCode = `
const foo1 = () => {
  let a = 1
  function inner() {
    a += a*2
    if( a<100 ) {
      inner()
    }
  }
  inner()
  return a
}
async function(){
  let a = 1
  async function inner(){
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
  const inner = () => {
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
  const inner = () => {
    a += a * 2
    if( a<100 ) {
      inner()

    }
  }
  const inner = async () => {
    a += a * 2
    if( a<100 ) {
      inner()

    }
  }

`

test('transformFunctionToVariableFunction global scope', async () => {
  // find in global scope
  const sourceFile = createSourceFileFromCode(globalScopeCode)
  const funcList = await findNodes<ts.FunctionDeclaration>(sourceFile, {
    kind: 'FunctionDeclaration',
    match(node) {
      return ts.isSourceFile(node.parent)
    },
  })
  let result = ''
  for (let func of funcList) {
    const isFunctionDeclaration = ts.isFunctionDeclaration(func!)
    expect(isFunctionDeclaration).toBe(true)
    // Real test:
    const varFunc = transformFunctionToVariableFunction(func!)
    // asserts
    expect(varFunc).toBeDefined()
    const isVariableStatement = ts.isVariableStatement(varFunc!)
    expect(isVariableStatement).toBe(true)
    const varFuncString = printNode(varFunc!, sourceFile)
    result += varFuncString + '\n'
  }

  expectCodeIsEquael(result, globalScopeExceptedCode, true)
})

test('transformFunctionToVariableFunction block scope', async () => {
  // find in global scope
  const sourceFile = createSourceFileFromCode(blockScopeCode)
  const funcList = await findNodes<ts.FunctionDeclaration>(sourceFile, {
    kind: 'FunctionDeclaration',
    match(node) {
      if (!ts.isBlock(node.parent)) {
        // console.log('Not in a block!')
        return false
      }
      if (!ts.isFunctionDeclaration(node)) {
        // console.log('Not VariableStatement!')
        return false
      }
      return true
    },
  })
  let result = ''
  expect(funcList).toBeDefined()
  expect(funcList.length).toBe(2)
  for (let func of funcList) {
    const isFunctionDeclaration = ts.isFunctionDeclaration(func!)
    expect(isFunctionDeclaration).toBe(true)
    // Real test:
    const varfunc = transformFunctionToVariableFunction(func!)
    // asserts
    expect(varfunc).toBeDefined()
    const isVariableStatement = ts.isVariableStatement(varfunc!)
    expect(isVariableStatement).toBe(true)
    const varFuncString = printNode(varfunc!, sourceFile)
    result += varFuncString + '\n'
  }

  expectCodeIsEquael(result, blockScopeExceptedCode, true)
})
