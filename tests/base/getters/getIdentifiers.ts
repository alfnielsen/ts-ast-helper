import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { getIdentifiers } from 'src/base/getters/getIdentifiers.ts'

test('test getIdentifiers', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = getIdentifiers
})
