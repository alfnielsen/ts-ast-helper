import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findNodeType } from 'src/base/nodeFinders/findOne/findNodeType'

test('test findNodeType', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findNodeType
})
