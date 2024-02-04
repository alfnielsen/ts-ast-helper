import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { tranformVisitor } from 'src/base/transformers/tranformVisitor.dev'

test('test tranformVisitor', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = tranformVisitor
})
