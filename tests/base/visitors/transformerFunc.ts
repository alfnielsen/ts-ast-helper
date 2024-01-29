import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { transformerFunc } from 'src/base/visitors/transformerFunc.ts'

test('test transformerFunc', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = transformerFunc
})
