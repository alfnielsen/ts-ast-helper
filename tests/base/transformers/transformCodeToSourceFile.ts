import { test } from 'bun:test'
import { transformCodeToSourceFile } from 'src/base/transformers/transformCodeToSourceFile.ts'

test('test transformCodeToSourceFile', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = transformCodeToSourceFile(code)
})
