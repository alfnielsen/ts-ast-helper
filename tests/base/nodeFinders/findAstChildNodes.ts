import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findAstChildNodes } from 'src/base/nodeFinders/findAstChildNodes.ts'

test('test findAstChildNodes', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findAstChildNodes
})
