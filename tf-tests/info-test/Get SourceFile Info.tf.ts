import * as ts from 'typescript'
import { getSourceFileInfo } from 'src/base/getters/infoMaps/getSourceFileInfo'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'

const code = `
import * as foo1 from "path/foo1" 
import foo2 from "path/foo2"

const foo1 = 1
let foo2 = "2"
var foo3 = 3

export const efoo1 = 1
export let efoo2 = "2"
export var efoo3 = 3

export const afoo1 = async () => {}
export const afoo2 = async function(){}
export const afoo3 = async function afoo3(){}


function foo4() {
  console.log('foo4')
}

export function foo5() {
  console.log('foo5')
}

export async function foo6() {
  console.log('foo6')
}

export default foo1

export { foo1, foo2, foo3, foo4 }


`

const sourceFile = createSourceFileFromCode(code)

const info = getSourceFileInfo(sourceFile)

console.log(JSON.stringify(info, null, 2))
