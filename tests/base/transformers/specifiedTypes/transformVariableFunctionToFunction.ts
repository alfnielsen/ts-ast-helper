import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { transformVariableFunctionToFunction } from 'src/base/transformers/specifiedTypes/transformVariableFunctionToFunction.ts'

test('test transformVariableFunctionToFunction', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = transformVariableFunctionToFunction
})
