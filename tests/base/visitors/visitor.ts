import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { visitor } from 'src/base/visitors/visitor.ts'

test('test visitor', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = visitor
})
