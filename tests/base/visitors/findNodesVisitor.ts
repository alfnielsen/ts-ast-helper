import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNodesVisitor } from 'src/base/visitors/findNodesVisitor.ts'

test('test findNodesVisitor', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNodesVisitor
})
