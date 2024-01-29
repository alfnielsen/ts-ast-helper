import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { transformStatements } from 'src/base/transformers/transformStatements.ts'

test('test transformStatements', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = transformStatements
})
