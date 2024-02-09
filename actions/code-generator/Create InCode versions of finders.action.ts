import * as ts from 'typescript'
import fs from 'fs'

import paths from 'src/staticPaths'
import { findFilesSync } from 'src/util/findFilesSync'
import { replaceAt } from 'src/util/replaceAt'
import { findImports } from 'src/base/nodeFinders/findMany/findImports'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { findFunction } from 'src/base/nodeFinders/findOne/findFunction'
import { getFunctionInfo } from 'src/base/getters/infoMaps/getFunctionInfo'

const files = findFilesSync(
  ['**/findOne/**/find*.ts', '**/findMany/**/find*.ts'],
  {
    absolute: true,
    cwd: paths.basePath,
  },
)

for (const filePath of files) {
  let code = fs.readFileSync(filePath, 'utf-8')
  const relPath = filePath.replace(paths.rootPath, '')
  const oCode = code
  const sourceFile = createSourceFileFromCode(code)
  const func = findFunction(sourceFile, {
    //includeVariableFunction: true,
    export: true,
    name: /^find/,
  })
  if (!func) {
    console.log('no function found in', relPath)
    continue
  }
  const funcInfo = getFunctionInfo(func)
  const endOfLastImport = findImports(sourceFile).pop()?.end ?? 0
  const pathRegExp = new RegExp(
    `/(findOne|findMany)(.+\/)?/${funcInfo.name}.ts$`,
  )
  const newImportPath = relPath.replace(
    pathRegExp,
    `/inCode/$1$2/${funcInfo.name}InCode.ts`,
  )
  const parameterNames = func.parameters.map((p) => p.name.getText())
  parameterNames.shift() // remove first parameter (node parameter) // this is replaced by 'code: string'
  parameterNames.unshift('code') // add 'code' as first parameter
  // step Replace from bottom to top (to ensure correct start nad end og nodes from original code)
  // step 1: replace body.
  const newCode = `{\n  const sourceFile = createSourceFileFromCode(code)\n  return ${
    funcInfo.name
  }(${funcInfo.statements.map((s) => s.text).join(', ')})\n}`
  code = replaceAt(code, newCode, funcInfo.body.start, funcInfo.body.end)
  // step 2: replace first function parameter
  code = replaceAt(
    code,
    `code: string`,
    funcInfo.parameters[0].start,
    funcInfo.parameters[0].end,
  )

  // step 3: changeName (* create nameTransformer)
  code = replaceAt(
    code,
    `${funcInfo.name}InCode`,
    nameNode.getStart(),
    nameNode.getEnd(),
  )
  // step 4: add import
  code = replaceAt(
    code,
    `\nimport { ${name} } from '${newImportPath}'`,
    endOfLastImport,
  )
  console.log('--------------')
  console.log(oCode)
  console.log('-->')
  console.log(code)

  // console.log(name, parameters, body.getText())
}
