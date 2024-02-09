import * as ts from 'typescript'
import * as info from 'src/base/getters/infoMaps/getImportInfo'
import { findImportsInCode } from 'src/base/nodeFinders/inCode/findManyInCode/findImportsInCode'

const code = `
import * as foo1 from "path/foo1" 
import foo2 from "path/foo2"
import type foo3Type from "path/foo3"
import { foo4 } from "path/foo4"
import { type foo5Type } from "path/foo5"
import { foo4 as foo6Alias } from "path/foo6"
import { type foo7Type as foo7TypeAlias } from "path/foo7"
import foo8Default, { foo8Named , type foo8NamedType, foo8NamedOriginal as foo8NamedAlias } from "path/foo8"
`

const imports = findImportsInCode(code)
const importInfos: info.ImportInfo[] = imports.map(info.getImportInfo)

importInfos.forEach((importInfo, i) => {
  console.log(`----- import${i}: ${importInfo.importPath} -----`)
  console.log(importInfo.text)
  console.log(importInfo.importNames)
  // console.log(JSON.stringify(importInfo, null, 2))
})
