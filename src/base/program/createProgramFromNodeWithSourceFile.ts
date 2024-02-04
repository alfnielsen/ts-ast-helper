import * as ts from 'typescript'

export type CreateProgramFromNodeWithSourceFileOptions = {
  fileName?: string
  writeFile?: (filename: string, data: string) => void
  getSourceFile?: (
    name: string,
    languageVersion: ts.ScriptTarget,
  ) => ts.SourceFile
  getDefaultLibFileName?: () => string
  useCaseSensitiveFileNames?: () => boolean
  getCanonicalFileName?: (filename: string) => string
  getCurrentDirectory?: () => string
  fileExists?: (filename: string) => boolean
  getNewLine?: () => string
  getDirectories?: (path: string) => string[]
  readFile?: (filename: string) => string | undefined
  defaultCompilerHost?: ts.CompilerHost
}

export const createProgramFromNodeWithSourceFile = (
  node: ts.Node,
  opt?: CreateProgramFromNodeWithSourceFileOptions,
): ts.Program => {
  const sourceFile = node.getSourceFile()
  let {
    defaultCompilerHost = ts.createCompilerHost({}),
    fileName = 'file.ts',
    writeFile = () => {},
    getSourceFile = (name: string, languageVersion: ts.ScriptTarget) => {
      if (name === fileName) {
        return sourceFile
      } else {
        return defaultCompilerHost.getSourceFile(name, languageVersion)
      }
    },
    getDefaultLibFileName = () => 'lib.d.ts',
    useCaseSensitiveFileNames = () => false,
    getCanonicalFileName = (filename: string) => filename,
    getCurrentDirectory = () => '',
    fileExists = () => true,
    getNewLine = () => '\n',
    getDirectories = () => [],
    readFile = () => '',
  } = opt ?? {}

  const customCompilerHost: ts.CompilerHost = {
    getSourceFile,
    writeFile,
    getDefaultLibFileName,
    useCaseSensitiveFileNames,
    getCanonicalFileName,
    getCurrentDirectory,
    getNewLine,
    getDirectories,
    fileExists,
    readFile,
  }

  const program = ts.createProgram([fileName], {}, customCompilerHost)
  return program
}
