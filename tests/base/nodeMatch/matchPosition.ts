import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { matchPosition } from 'src/base/nodeMatch/matchPosition.ts'

test('test matchPosition', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = matchPosition
})
