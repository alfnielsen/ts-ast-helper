import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findFunction } from 'src/base/nodeFinders/specifiedTypes/findOne/findFunction.ts'

test('test findFunction', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findFunction
})
