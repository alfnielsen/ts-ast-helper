import * as ts from 'typescript'
import { terminalStyle as $ } from 'src/util/terminal/terminalColors'

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
}

function watchMain() {
  const configPath = ts.findConfigFile(
    /*searchPath*/ './root/',
    ts.sys.fileExists,
    'tsconfig.json',
  )
  if (!configPath) {
    throw new Error("Could not find a valid 'tsconfig.json'.")
  }

  // TypeScript can use several different program creation "strategies":
  //  * ts.createEmitAndSemanticDiagnosticsBuilderProgram,
  //  * ts.createSemanticDiagnosticsBuilderProgram
  //  * ts.createAbstractBuilder
  // The first two produce "builder programs". These use an incremental strategy
  // to only re-check and emit files whose contents may have changed, or whose
  // dependencies may have changes which may impact change the result of prior
  // type-check and emit.
  // The last uses an ordinary program which does a full type check after every
  // change.
  // Between `createEmitAndSemanticDiagnosticsBuilderProgram` and
  // `createSemanticDiagnosticsBuilderProgram`, the only difference is emit.
  // For pure type-checking scenarios, or when another tool/process handles emit,
  // using `createSemanticDiagnosticsBuilderProgram` may be more desirable.
  const createProgram = ts.createSemanticDiagnosticsBuilderProgram

  // Note that there is another overload for `createWatchCompilerHost` that takes
  // a set of root files.
  const host = ts.createWatchCompilerHost(
    configPath,
    {},
    ts.sys,
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged,
  )

  // You can technically override any given hook on the host, though you probably
  // don't need to.
  // Note that we're assuming `origCreateProgram` and `origPostProgramCreate`
  // doesn't use `this` at all.
  const origCreateProgram = host.createProgram
  host.createProgram = (
    rootNames: ReadonlyArray<string> | undefined,
    options,
    host,
    oldProgram,
  ) => {
    console.log(
      `${$.gray}###### ${$.yellow} We're about to create the program ${$.gray}######${$.reset}`,
    )

    return origCreateProgram(rootNames, options, host, oldProgram)
  }
  const origPostProgramCreate = host.afterProgramCreate

  host.afterProgramCreate = program => {
    console.log(
      `${$.gray}###### ${$.yellow} We finished making the program ${$.gray}######${$.reset}`,
    )
    origPostProgramCreate!(program)
  }

  // `createWatchProgram` creates an initial program, watches files, and updates
  // the program over time.
  ts.createWatchProgram(host)
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  console.log('----reportDiagnostic----')
  const pos = ts.getLineAndCharacterOfPosition(
    diagnostic.file!,
    diagnostic.start!,
  )

  console.log('code:                ', diagnostic.code)
  console.log('file:                ', diagnostic.file?.fileName)
  console.log('messageText:         ', diagnostic.messageText)
  console.log('category:            ', diagnostic.category)
  console.log('relatedInformation:  ', diagnostic.relatedInformation)
  console.log('source:              ', diagnostic.source)
  console.log('start:               ', diagnostic.start)
  console.log('length:              ', diagnostic.length)
  console.log('line:                ', pos.line)
  console.log('character:           ', pos.character)
}

/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
  console.log('-----reportWatchStatusChanged-----')
  const diagnosticText = ts.formatDiagnostic(diagnostic, formatHost)
  const msgColor =
    diagnostic.category === ts.DiagnosticCategory.Error ? $.red : $.gray
  const msgMatch = diagnosticText.match(
    /(?<=^|\n)(message\s*TS[0-9]+)([\s\S]+)(?=\n|$)/,
  )!
  console.info(`${msgColor}${msgMatch[1]}${$.reset}${msgMatch[2]}`)
  // console.info(ts.formatDiagnostic(diagnostic, formatHost))

  const pos =
    diagnostic.file && diagnostic.start
      ? ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start)
      : { line: 0, character: 0 }

  console.log('code:                ', diagnostic.code)
  console.log('file:                ', diagnostic.file?.fileName)
  console.log('messageText:         ', diagnostic.messageText)
  console.log('category:            ', diagnostic.category)
  console.log('relatedInformation:  ', diagnostic.relatedInformation)
  console.log('source:              ', diagnostic.source)
  console.log('start:               ', diagnostic.start)
  console.log('length:              ', diagnostic.length)
  console.log('line:                ', pos.line)
  console.log('character:           ', pos.character)
}

watchMain()
