import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { createProgramFromCode } from 'src/base/program/createProgramFromCode'

test('test createProgramFromString', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = createProgramFromCode
})
