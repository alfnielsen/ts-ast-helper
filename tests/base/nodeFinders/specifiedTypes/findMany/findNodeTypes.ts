import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNodeTypes } from 'src/base/nodeFinders/findMany/findNodeTypes'

test('test findNodeTypes', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNodeTypes
})
