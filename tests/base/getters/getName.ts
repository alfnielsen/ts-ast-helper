import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { getName } from 'src/base/getters/nodePropertyGetters/getName'

test('test getName', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = getName
})
