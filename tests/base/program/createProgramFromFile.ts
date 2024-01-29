import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { createProgramFromFile } from 'src/base/program/createProgramFromFile.ts'

test('test createProgramFromFile', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = createProgramFromFile
})
