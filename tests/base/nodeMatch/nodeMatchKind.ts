import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatchKind } from 'src/base/nodeMatch/nodeMatchKind.ts'

test('test nodeMatchKind', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatchKind
})
