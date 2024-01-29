// find all files that has postfix .gtest.ts

import { Glob } from 'bun'
import fs from 'fs'
import { join, sep } from 'path'
import paths from 'src/staticPaths'

const glob = new Glob('src/base/**/*.ts')
const files = [
  ...glob.scanSync({
    absolute: true,
    onlyFiles: true,
  }),
]

const templatePath = join(paths.templatesPath, sep, 'test-template.txt')
//console.log(templatePath)
const template = fs.readFileSync(templatePath, 'utf8')
const compileTemplate = (name: string, path: string) => {
  const nameRegex = new RegExp(`\\$\\$name`, 'g')
  const pathRegex = new RegExp(`\\$\\$path`, 'g')
  //console.log(nameRegex, pathRegex)
  return template.replace(nameRegex, name).replace(pathRegex, path)
}

//console.log(files)
for (let filePath of files) {
  const name = filePath.split(sep).pop()!.replace('.ts', '')
  const relPath = filePath.replace(paths.rootPath + sep, '')
  const content = compileTemplate(name, relPath)
  const testPath = relPath.replace('src', 'tests')
  const testFilePath = join(paths.rootPath, testPath)
  const exists = fs.existsSync(testFilePath)
  if (exists) {
    console.log(`test file ${testFilePath} already exists`)
    continue
  }
  console.log(`creating test file ${testPath}`)
  await Bun.write(testFilePath, content)
}
