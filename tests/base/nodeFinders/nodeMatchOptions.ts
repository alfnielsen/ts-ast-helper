import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatchOptions } from 'src/base/nodeFinders/nodeMatchOptions.ts'

test('test nodeMatchOptions', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatchOptions
})
