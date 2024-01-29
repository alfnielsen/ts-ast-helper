import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { createSemanticDiagnosticsWatchProgram } from 'src/base/program/createSemanticDiagnosticsWatchProgram.ts'

test('test createSemanticDiagnosticsWatchProgram', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = createSemanticDiagnosticsWatchProgram
})
