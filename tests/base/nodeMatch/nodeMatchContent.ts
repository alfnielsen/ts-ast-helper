import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatchContent } from 'src/base/nodeMatch/match/nodeMatchContent'

test('test nodeMatchContent', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatchContent
})
