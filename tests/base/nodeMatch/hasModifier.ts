import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { hasModifier } from 'src/base/nodeMatch/has/hasModifier'

test('test hasModifier', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = hasModifier
})
