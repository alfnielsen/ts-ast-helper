import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeKinds } from 'src/base/printer/nodeKinds.ts'

test('test nodeKinds', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeKinds
})
