import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatchType } from 'src/base/nodeMatch/nodeMatchType.ts'

test('test nodeMatchType', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatchType
})
