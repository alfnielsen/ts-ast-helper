import * as ts from 'typescript'

export type CreateSourceFileFromCodeOptions = {
  fileName?: string
  languageVersionOrOptions?: ts.ScriptTarget | ts.CreateSourceFileOptions
  setParentNodes?: boolean | undefined
  scriptKind?: ts.ScriptKind | undefined
}

export function createSourceFileFromCode(
  code: string,
  opt?: CreateSourceFileFromCodeOptions,
): ts.SourceFile {
  let {
    fileName = 'file.ts',
    languageVersionOrOptions = ts.ScriptTarget.Latest,
    setParentNodes = false,
    scriptKind = ts.ScriptKind.TS,
  } = opt ?? {}
  const sourceFile = ts.createSourceFile(
    fileName,
    code,
    languageVersionOrOptions,
    setParentNodes,
    scriptKind,
  )
  return sourceFile
}
