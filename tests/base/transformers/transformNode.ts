import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { transformNode } from 'src/base/transformers/transformNode.ts'

test('test transformNode', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = transformNode
})
