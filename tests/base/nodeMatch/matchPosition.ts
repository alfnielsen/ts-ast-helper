import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { matchPosition } from 'src/base/nodeMatch/match/nodeStartBeforePosition'

test('test matchPosition', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = matchPosition
})
