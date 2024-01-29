import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNodeKinds } from 'src/base/nodeFinders/specifiedTypes/findMany/findNodeKinds.ts'

test('test findNodeKinds', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNodeKinds
})
