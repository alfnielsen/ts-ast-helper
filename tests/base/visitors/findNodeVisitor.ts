import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNodeVisitor } from 'src/base/visitors/findNodeVisitor.ts'

test('test findNodeVisitor', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNodeVisitor
})
