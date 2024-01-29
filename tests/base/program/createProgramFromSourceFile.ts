import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { createProgramFromSourceFile } from 'src/base/program/createProgramFromSourceFile.ts'

test('test createProgramFromSourceFile', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = createProgramFromSourceFile
})
