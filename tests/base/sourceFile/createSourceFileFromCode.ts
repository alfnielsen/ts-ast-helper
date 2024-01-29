import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode.ts'

test('test createSourceFileFromCode', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = createSourceFileFromCode
})
