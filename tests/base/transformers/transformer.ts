import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { transformer } from 'src/base/transformers/transformer.ts'

test('test transformer', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = transformer
})
