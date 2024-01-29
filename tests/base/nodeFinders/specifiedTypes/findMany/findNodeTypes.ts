import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNodeTypes } from 'src/base/nodeFinders/specifiedTypes/findMany/findNodeTypes.ts'

test('test findNodeTypes', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNodeTypes
})
