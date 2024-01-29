import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNodesInStringVisitor } from 'src/base/visitors/findNodesInStringVisitor.ts'

test('test findNodesInStringVisitor', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNodesInStringVisitor
})
