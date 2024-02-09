import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatchOneOfNames } from 'src/base/nodeMatch/match/nodeMatchOneOfNames'

test('test nodeMatchOneOfNames', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatchOneOfNames
})
