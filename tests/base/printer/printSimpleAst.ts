import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { printSimpleAst } from 'src/base/printer/printSimpleAst.ts'

test('test printSimpleAst', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = printSimpleAst
})
