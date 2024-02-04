import { Glob } from 'bun'
import { join } from 'path'
import paths from 'src/staticPaths'

const glob = new Glob('**/*.ts')

// Scans the current working directory and each of its sub-directories recursively
function getType(root: string, note: string, exclude?: RegExp) {
  const filePaths = [
    ...glob.scanSync({
      absolute: true,
      cwd: root,
    }),
  ]
  let content = `// ${note}\n`
  for (const filePath of filePaths) {
    if (exclude && exclude.test(filePath)) continue
    const relativePath = filePath
      .replace(paths.rootPath, '')
      .replace(/^\//g, '')
      .replace(/\.ts$/, '')
    content += `export * from "${relativePath}"\n`
  }
  return content
}

let content = getType(paths.basePath, 'base', /\.dev\.ts$/)
let baseExportPath = join(paths.srcPath, 'index.ts')
Bun.write(baseExportPath, content)

let experimental = getType(paths.experimentalPath, 'experimental')
let experimentalExportPath = join(paths.srcPath, 'experimental.ts')
Bun.write(experimentalExportPath, experimental)

let util = getType(paths.utilPath, 'util')
let utilExportPath = join(paths.srcPath, 'util.ts')
Bun.write(utilExportPath, util)

console.log('Paths:')
console.log(baseExportPath)
console.log(experimentalExportPath)
console.log(utilExportPath)
