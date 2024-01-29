import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { nodeMatchOneOfKinds } from 'src/base/nodeMatch/nodeMatchOneOfKinds.ts'

test('test nodeMatchOneOfKinds', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = nodeMatchOneOfKinds
})
