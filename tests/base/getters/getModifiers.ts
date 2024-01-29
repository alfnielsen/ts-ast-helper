import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { getModifiers } from 'src/base/getters/getModifiers.ts'

test('test getModifiers', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = getModifiers
})
