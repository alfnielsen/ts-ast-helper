import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { tranformSourceFileWithState } from 'src/base/transformers/tranformSourceFileWithState.ts'

test('test tranformSourceFileWithState', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = tranformSourceFileWithState
})
