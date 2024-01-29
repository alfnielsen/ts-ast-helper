import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatchContent } from 'src/base/nodeMatch/nodeMatchContent.ts'

test('test nodeMatchContent', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatchContent
})
