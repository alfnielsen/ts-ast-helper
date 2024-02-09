import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { getAstChildOfKind } from 'src/base/getters/nodePropertyGetters/getAstChildOfKind'

test('test getAstChildOfKind', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = getAstChildOfKind
})
