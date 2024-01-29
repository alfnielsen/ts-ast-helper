import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { getIdentifier } from 'src/base/getters/getIdentifier.ts'

test('test getIdentifier', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = getIdentifier
})
