import * as ts from 'typescript'
import { test, expect } from 'bun:test'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { transformVariableFunctionToFunction } from 'src/base/transformers/specifiedTypes/transformVariableFunctionToFunction'
import { findNode } from 'src/base/nodeFinders/findNode'

test('transformFunctionDeclarationToArrowFunction', async () => {
  const code = `
export const foo = () => {
  const a = 1
  const b = 2
  const c = 3
  return a + b + c
}
`
  const sourceFile = createSourceFileFromCode(code)
  const varFunc = await findNode<ts.VariableStatement>(sourceFile, {
    kind: 'VariableStatement',
  })
  expect(varFunc).toBeDefined()
  console.log('---Content:----------------')
  console.log(varFunc!.getText(sourceFile))
  console.log('-------------------')
  const isVariableStatement = ts.isVariableStatement(varFunc!)
  expect(isVariableStatement).toBe(true)
  // Real test:
  const func = transformVariableFunctionToFunction(varFunc!)
  // asserts
  expect(func).toBeDefined()
  const isFunctionDeclaration = ts.isFunctionDeclaration(func!)
  expect(isFunctionDeclaration).toBe(true)
  console.log('---func-Content:----------------')
  const funcString = func!.getText(sourceFile)
  const funcExcept = `
  import * as ts from 'typescript'
export function foo() {
  const a = 1
  const b = 2
  const c = 3
  return a + b + c
}
`.trim()

  expect(funcString).toBe(funcExcept)
})
