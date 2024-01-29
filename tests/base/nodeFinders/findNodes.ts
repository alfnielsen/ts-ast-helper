import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNodes } from 'src/base/nodeFinders/findNodes.ts'

test('test findNodes', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNodes
})
