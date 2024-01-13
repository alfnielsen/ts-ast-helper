import * as ts from "typescript"

export type WatchProgramOptions = {
  configPath?: string
  options?: ts.CompilerOptions
  formatHost?: ts.FormatDiagnosticsHost
  onStatusChanged?: (opt: { diagnostic: ts.Diagnostic; line: number; character: number }) => void
  onReportDiagnostic?: (opt: { diagnostic: ts.Diagnostic; line: number; character: number }) => void
  onCreateProgram?: (opt: {
    rootNames: ReadonlyArray<string> | undefined
    options?: ts.CompilerOptions
    host?: ts.CompilerHost
    oldProgram: ts.SemanticDiagnosticsBuilderProgram | undefined
  }) => void
  onProgramCreated?: (opt: { program: ts.SemanticDiagnosticsBuilderProgram }) => void
} & (
  | {
      rootFiles: string[]
      rootPath?: undefined
    }
  | {
      rootPath: string
      rootFiles?: undefined
    }
)

const defaultFormatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
}

export const createSemanticDiagnosticsWatchProgram = (opt: WatchProgramOptions) => {
  let {
    configPath,
    options = {},
    formatHost = defaultFormatHost,
    onCreateProgram,
    onReportDiagnostic,
    onProgramCreated,
    onStatusChanged,
    //
    rootFiles,
    rootPath,
  } = opt

  configPath ??= rootPath && ts.findConfigFile(rootPath, ts.sys.fileExists, "tsconfig.json")
  if (!configPath) {
    throw new Error("Could not find a valid 'tsconfig.json'.")
  }

  const createProgram = ts.createSemanticDiagnosticsBuilderProgram
  if (rootFiles !== undefined) {
    const host = ts.createWatchCompilerHost(
      rootFiles,
      options,
      ts.sys,
      createProgram,
      reportDiagnostic,
      reportWatchStatusChanged
    )
    const origCreateProgram = host.createProgram
    const origPostProgramCreate = host.afterProgramCreate
    host.createProgram = (rootNames: ReadonlyArray<string> | undefined, options, host, oldProgram) => {
      // interception
      onCreateProgram?.({ rootNames, options, host, oldProgram })
      return origCreateProgram(rootNames, options, host, oldProgram)
    }
    host.afterProgramCreate = program => {
      // interception
      onProgramCreated?.({ program })
      origPostProgramCreate!(program)
    }
    const program = ts.createWatchProgram(host)
    return program
  }
  const host = ts.createWatchCompilerHost(
    configPath,
    options,
    ts.sys,
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged
  )
  const origCreateProgram = host.createProgram
  const origPostProgramCreate = host.afterProgramCreate
  host.createProgram = (rootNames: ReadonlyArray<string> | undefined, options, host, oldProgram) => {
    // interception
    onCreateProgram?.({ rootNames, options, host, oldProgram })
    return origCreateProgram(rootNames, options, host, oldProgram)
  }
  host.afterProgramCreate = program => {
    // interception
    onProgramCreated?.({ program })
    origPostProgramCreate!(program)
  }
  const program = ts.createWatchProgram(host)
  return program

  function reportDiagnostic(diagnostic: ts.Diagnostic) {
    const pos =
      diagnostic.file && diagnostic.start
        ? ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start)
        : { line: 0, character: 0 }

    // intercept
    onReportDiagnostic?.({
      diagnostic,
      line: pos.line,
      character: pos.character,
    })
  }

  /**
   * Prints a diagnostic every time the watch status changes.
   * This is mainly for messages like "Starting compilation" or "Compilation completed".
   */
  function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
    const pos =
      diagnostic.file && diagnostic.start
        ? ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start)
        : { line: 0, character: 0 }

    // intercept
    onStatusChanged?.({
      diagnostic,
      line: pos.line,
      character: pos.character,
    })
  }
}
