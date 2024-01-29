import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNode } from 'src/base/nodeFinders/findNode.ts'

test('test findNode', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNode
})
