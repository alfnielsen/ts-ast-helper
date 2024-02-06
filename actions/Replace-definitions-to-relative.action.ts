import * as ts from 'typescript'
import { Glob } from 'bun'
import { relative, normalize, dirname, basename, join, sep } from 'path'
import { findNodesInCode } from 'src/base'
import paths from 'src/staticPaths'
// find all files that has postfix .gtest.ts
// consider add to run-test-files (runtf):
// @tf-option: onlyLog(Only log changes)['yes','no']
let development = false

if (
  Object.keys(process.env)
    .map((e) => e.toLowerCase())
    .includes('development')
) {
  development = true
}
if (development) {
  console.log(`[ Running in developmet mode ]`)
}
// overrite her in code:

type ReplaceImports = {
  start: number
  end: number
  path: string
}
const getReplaceImports = (fileFolder: string, expression: ts.Expression) => {
  const originalImportPath = expression.getText().replace(/(^['"]|['"]$)/g, '')
  let newImports: ReplaceImports[] = []
  if (/^src\//.test(originalImportPath)) {
    const modulePath = originalImportPath.replace(/src\//, '')
    const moduleName = basename(modulePath)
    const moduleFolder = dirname(modulePath)
    const rel = normalize(relative(fileFolder, moduleFolder))
    const newModulePath = rel === '.' ? moduleName : join(rel, moduleName)
    const newRelativeImportPath = `.${sep}${newModulePath}`
    newImports.push({
      start: expression.getStart() + 1, // +1 is the qutaion
      end: expression.getEnd() - 1, // -1 is the qutaion
      path: newRelativeImportPath,
    })
  }
  return newImports
}
const replacePath = (code: string, imp: ReplaceImports) => {
  return code.substring(0, imp.start) + imp.path + code.substring(imp.end)
}
const glob = new Glob('types/**/*.d.ts')
const scanner = glob.scan({
  absolute: true,
  onlyFiles: true,
})

let count = 0
for await (const filePath of scanner) {
  let code = await Bun.file(filePath).text()
  let orgCode = code
  const fileRelativePath = filePath
    .replace(paths.typesPath, '') // from types folder (root is'h)
    .replace(/^\//, '') // remove leading slash
  const fileFolder = dirname(fileRelativePath)
  // collect expressions
  const imports = findNodesInCode<ts.ImportDeclaration>(code, {
    kind: 'ImportDeclaration',
  })
  const exports = findNodesInCode<ts.ExportDeclaration>(code, {
    kind: 'ExportDeclaration',
  })
  const moduleSpecifiers: ts.Expression[] = []
  // add imports
  moduleSpecifiers.push(...imports.map((x) => x.moduleSpecifier))
  // add exports
  moduleSpecifiers.push(
    ...exports
      .filter((x) => !!x.moduleSpecifier)
      .map((x) => x.moduleSpecifier!),
  )
  const replaceImports = moduleSpecifiers.flatMap((m) =>
    getReplaceImports(fileFolder, m),
  )

  // sort and reverse replaceImports then replace all imports (base on start-end)
  replaceImports
    .toSorted((a, b) => a.start - b.start)
    .reverse()
    .forEach((imp) => {
      // replace in code
      code = replacePath(code, imp)
    })

  if (development) {
    if (code != orgCode) {
      count++
      console.log(
        `───────────────────Replacement─Orgininal─────────────────────────────`,
      )
      console.log(`####### ${filePath}`)
      console.log(orgCode)
      console.log(
        `───────────────────Replacement─New─────────────────────────────`,
      )
      console.log(code)
      console.log(
        `────────────────────────────────────────────────────────────────────`,
      )
    }
  }
  if (!development) {
    // save file
    Bun.write(filePath, code)
  }
}
console.log(`Replaced in ${count} files`)
