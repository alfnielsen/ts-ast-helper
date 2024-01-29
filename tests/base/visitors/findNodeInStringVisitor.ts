import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNodeInStringVisitor } from 'src/base/visitors/findNodeInStringVisitor.ts'

test('test findNodeInStringVisitor', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNodeInStringVisitor
})
