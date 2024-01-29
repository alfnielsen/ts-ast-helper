import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatch } from 'src/base/nodeMatch/nodeMatch.ts'

test('test nodeMatch', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatch
})
