import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { findIdentifier } from 'src/base/nodeFinders/findOne/findIdentifier'

test('test findIdentifier', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = findIdentifier
})
