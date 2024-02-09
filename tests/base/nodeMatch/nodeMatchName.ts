import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatchName } from 'src/base/nodeMatch/match/nodeMatchName'

test('test nodeMatchName', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatchName
})
