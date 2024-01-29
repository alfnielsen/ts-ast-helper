import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNodeKind } from 'src/base/nodeFinders/specifiedTypes/findOne/findNodeKind.ts'

test('test findNodeKind', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNodeKind
})
