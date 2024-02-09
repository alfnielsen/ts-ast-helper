import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatchOneOfTypes } from 'src/base/nodeMatch/match/nodeMatchOneOfTypes'

test('test nodeMatchOneOfTypes', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatchOneOfTypes
})
