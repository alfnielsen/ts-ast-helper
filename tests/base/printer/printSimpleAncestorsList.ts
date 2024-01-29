import { test, expect } from 'bun:test'
import * as ts from 'typescript'
import { printSimpleAncestorsList } from 'src/base/printer/printSimpleAncestorsList.ts'

test('test printSimpleAncestorsList', async () => {
  const code = `
import * as ts from 'typescript'
export const foo = () => {
  
}

`
  const res = printSimpleAncestorsList
})
