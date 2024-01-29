import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeKind } from 'src/base/printer/nodeKind.ts'

test('test nodeKind', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeKind
})
