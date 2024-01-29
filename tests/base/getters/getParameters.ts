import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { getParameters } from 'src/base/getters/getParameters.ts'

test('test getParameters', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = getParameters
})
