import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeTextMatch } from 'src/base/nodeMatch/nodeTextMatch.ts'

test('test nodeTextMatch', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeTextMatch
})
