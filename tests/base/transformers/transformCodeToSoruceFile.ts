import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { transformCodeToSourceFile } from 'src/base/transformers/transformCodeToSourceFile'

test('test transformCodeToSoruceFile', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = transformCodeToSourceFile
})
