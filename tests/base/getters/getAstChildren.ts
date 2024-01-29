import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { getAstChildren } from 'src/base/getters/getAstChildren.ts'

test('test getAstChildren', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = getAstChildren
})
