import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeNameContains } from 'src/base/nodeMatch/nodeNameContains.ts'

test('test nodeNameContains', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeNameContains
})
