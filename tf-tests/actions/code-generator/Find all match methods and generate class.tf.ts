import * as ts from 'typescript'
import paths from 'src/staticPaths'
import { Glob } from 'bun'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import { findNodesVisitor } from 'src/base/visitors/findNodesVisitor'
import { getNodeName } from 'src/base/nodeProperties/getNodeName'
import { get } from 'http'

const glob = new Glob('**/*.ts')

const functionList: ts.FunctionDeclaration[] = []
// Scans the current working directory and each of its sub-directories recursively
for await (const file of glob.scan({
  absolute: true,
  cwd: paths.baseNModeMatchPath,
})) {
  // find all exported functions
  const fileContent = await Bun.file(file).text()
  const sourceFile = createSourceFileFromCode(fileContent)
  const fileFunctionList = findNodesVisitor<ts.FunctionDeclaration>(
    sourceFile,
    (node) => {
      if (ts.isFunctionDeclaration(node)) {
        const isExported = node.modifiers?.some(
          (m) => m.kind === ts.SyntaxKind.ExportKeyword,
        )
        if (!isExported) return false
        return true
      }
      return false
    },
  )
  functionList.push(...fileFunctionList)
}
// print names and argumetns:
const methods = functionList.map((f) => {
  const funcName = getNodeName(f) ?? ''
  const parameters = f.parameters
    .filter((p) => getNodeName(p) !== 'node')
    .map((p) => p.type?.getText())
    .filter((p) => !!p)
    .join(', ')
  const propName = funcName?.replace(/^(?:node(?:Match)?)?(.)/, (_all, m) =>
    m.toLowerCase(),
  )
  const propOption = `  ${propName}?: ${parameters},`

  const importStatement = `import { ${funcName} } from 'src/base/nodeMatch/${funcName}'`

  const checkers = f.parameters
    .filter((p) => getNodeName(p) !== 'node')
    .map((p) => {
      const type = p.type?.getText()
      const dotdot = !!p.dotDotDotToken
      return `${dotdot ? '...' : ''}${type}`
    })
    .filter((p) => !!p)
    .join(', ')

  return {
    name: funcName,
    importStatement,
    propName,
    parameters,
    propOption,
    checkers,
  }
})

let fileContent = ` /* AUTO GENERATED FILE */\n`
// print import statements
methods.forEach((m) => {
  fileContent += `${m.importStatement}\n`
})
fileContent += `\n`
// print option
fileContent += `export type NodeMatchOptions = {\n`
methods.forEach((m) => {
  fileContent += `${m.propOption}\n`
})
fileContent += `}\n`
fileContent += `\n`
// print function
fileContent += `export function nodeMatch(node: ts.Node, options: NodeMatchOptions): boolean {\n`
methods.forEach((m) => {
  fileContent += `  if (options.${m.propName} && !${m.name}(node, options.${m.propName})) {\n`
  fileContent += `    return false\n`
  fileContent += `  }\n`
})
fileContent += `  return true\n`
fileContent += `}\n`
fileContent += `\n`
// print default export
fileContent += `export default nodeMatch\n`
fileContent += `\n`

console.log(fileContent)
// save file
const filePath = paths.baseNModeMatchPath + '/nodeMatch.ts'

await Bun.write(filePath, fileContent)
