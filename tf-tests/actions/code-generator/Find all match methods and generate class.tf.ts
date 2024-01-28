import * as ts from 'typescript'
import paths from 'src/staticPaths'
import { Glob } from 'bun'
import { getNodeName } from 'src/base/nodeProperties/getNodeName'
import { findNodesInStringVisitor } from 'src/base/visitors/findNodesInStringVisitor'
import { findFunction } from 'src/base/nodeFinders/specifiedTypes/findOne/findFunction'
import { findFunctions } from 'src/base/nodeFinders/specifiedTypes/findMany/findFunctions'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'

const glob = new Glob('**/*.ts')

const methods = [] as {
  name: string
  importStatement: string
  propName: string
  parameters: string
  propOption: string
  checkers: string
  parametersTypeDefinition: string
}[]
// Scans the current working directory and each of its sub-directories recursively
for await (const file of glob.scan({
  absolute: true,
  cwd: paths.baseNModeMatchPath,
})) {
  // find all exported functions
  const fileContent = await Bun.file(file).text()
  const sourceFile = createSourceFileFromCode(fileContent)
  // Find exported function
  const fileFunctionList = findFunctions(sourceFile, {
    export: true,
  })
  console.log(fileFunctionList.map((f) => f.getText()))
  const listParameters = (
    parameters: ts.NodeArray<ts.ParameterDeclaration>,
  ) => {
    return parameters
      .filter((p) => getNodeName(p) !== 'node')
      .map((p) => p.type?.getText())
      .filter((p) => !!p)
      .join(', ')
  }

  const listParameterTypeDefinitions = (
    parameters: ts.NodeArray<ts.ParameterDeclaration>,
  ) => {
    return parameters
      .map((p) => {
        if (getNodeName(p) === 'node') return ''
        if (!p.type) return ''
        // find each type in type definitions
        // Types Ex:
        // - string | number
        // - (ts.SyntaxKind | keyof typeof ts.SyntaxKind)[]
        // - ts.SyntaxKind | keyof typeof ts.SyntaxKind
        // - number[]
        const typeName = p.type.getText()
        // try to find type definition in file
        console.log('typeName::', typeName)
        const typeDef = findNodesInStringVisitor<ts.TypeAliasDeclaration>(
          fileContent,
          (node) => {
            if (!ts.isTypeAliasDeclaration(node)) return false
            const name = getNodeName(node)
            if (name !== typeName) return false
            return true
          },
        )
        return typeDef[0]?.getText() ?? ''
      })
      .filter((p) => !!p)
      .join(', ')
  }

  const fileMethods = fileFunctionList.map((f) => {
    const funcName = getNodeName(f) ?? ''
    const parameters = listParameters(f.parameters)
    // find parameters type (if exists as a type in the file)
    const parametersTypeDefinition = listParameterTypeDefinitions(f.parameters)

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
      parametersTypeDefinition,
    }
  })
  fileMethods.push(...methods)
}
// print names and argumetns:

let fileContent = ` /* AUTO GENERATED FILE */\n`
fileContent += `import * as ts from 'typescript'\n`
// print import statements
methods.forEach((m) => {
  fileContent += `${m.importStatement}\n`
})
fileContent += `\n`

// print type definition
methods.forEach((m) => {
  fileContent += `${m.parametersTypeDefinition}\n`
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
