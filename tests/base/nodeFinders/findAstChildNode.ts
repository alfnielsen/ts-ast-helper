import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findAstChildNode } from 'src/base/nodeFinders/findAstChildNode.ts'

test('test findAstChildNode', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findAstChildNode
})
