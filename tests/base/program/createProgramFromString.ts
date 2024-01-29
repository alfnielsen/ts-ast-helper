import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { createProgramFromString } from 'src/base/program/createProgramFromString.ts'

test('test createProgramFromString', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = createProgramFromString
})
