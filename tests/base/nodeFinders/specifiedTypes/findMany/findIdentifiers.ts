import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findIdentifiers } from 'src/base/nodeFinders/findMany/findIdentifiers'

test('test findIdentifiers', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findIdentifiers
})
