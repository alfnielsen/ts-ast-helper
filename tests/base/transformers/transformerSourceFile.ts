import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { transformerSourceFile } from 'src/base/transformers/transformerSourceFile.ts'

test('test transformerSourceFile', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = transformerSourceFile
})
