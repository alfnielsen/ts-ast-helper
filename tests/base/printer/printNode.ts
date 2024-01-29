import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { printNode } from 'src/base/printer/printNode.ts'

test('test printNode', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = printNode
})
