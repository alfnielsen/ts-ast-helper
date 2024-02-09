import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNodeKind } from 'src/base/nodeFinders/findOne/findNodeKind'

test('test findNodeKind', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNodeKind
})
