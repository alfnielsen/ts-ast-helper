import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatchKind } from 'src/base/nodeMatch/match/nodeMatchKind'

test('test nodeMatchKind', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatchKind
})
