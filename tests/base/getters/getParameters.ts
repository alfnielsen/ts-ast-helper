import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { getParameters } from 'src/base/getters/nodePropertyGetters/getParameters'

test('test getParameters', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = getParameters
})
