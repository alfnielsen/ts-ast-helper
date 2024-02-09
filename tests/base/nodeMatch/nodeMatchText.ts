import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatchText } from 'src/base/nodeMatch/match/nodeMatchText'

test('test nodeMatchText', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatchText
})
