import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { hasModifiers } from 'src/base/nodeMatch/hasAll/hasModifiers'

test('test hasModifiers', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = hasModifiers
})
