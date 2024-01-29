import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { transformCode } from 'src/base/transformers/transformCode.ts'

test('test transformCode', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = transformCode
})
