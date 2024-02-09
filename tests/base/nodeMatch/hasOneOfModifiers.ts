import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { hasOneOfModifiers } from 'src/base/nodeMatch/hasOneOf/hasOneOfModifiers'

test('test hasOneOfModifiers', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = hasOneOfModifiers
})
