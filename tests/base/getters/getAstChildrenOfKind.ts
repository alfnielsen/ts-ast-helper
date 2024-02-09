import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { getAstChildrenOfKind } from 'src/base/getters/nodePropertyGetters/getAstChildrenOfKind'

test('test getAstChildrenOfKind', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = getAstChildrenOfKind
})
