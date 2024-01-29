import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findFunctions } from 'src/base/nodeFinders/specifiedTypes/findMany/findFunctions.ts'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'

test('test findFunctions', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}
export function bar() {
    
  } 
`
  const sourceFile = createSourceFileFromCode(code)
  const res = findFunctions(sourceFile, {})

  expect(res.length).toBe(2)
})
