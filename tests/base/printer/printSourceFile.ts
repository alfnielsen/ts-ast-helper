import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { printSourceFile } from 'src/base/printer/printSourceFile.ts'

test('test printSourceFile', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = printSourceFile
})
