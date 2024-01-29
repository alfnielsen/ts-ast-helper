import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { tranformWithState } from 'src/base/transformers/tranformWithState.ts'

test('test tranformWithState', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = tranformWithState
})
