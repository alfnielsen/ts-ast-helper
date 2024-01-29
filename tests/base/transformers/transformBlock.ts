import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { transformBlock } from 'src/base/transformers/transformBlock.ts'

test('test transformBlock', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = transformBlock
})
