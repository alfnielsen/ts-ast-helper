import * as ts from "typescript"
import { test, expect } from "bun:test"
import { createSemanticDiagnosticsWatchProgram } from "../../src/base/program/createSemanticDiagnosticsWatchProgram"
import { join } from "path"

test("createSemanticDiagnosticsWatchProgram: rootPath", async () => {
  const rootPath = join(import.meta.dir, "root")
  const testFilePath = join(rootPath, "test.ts")
  //create program
  let onCreate = false
  let onCreated = false
  let programCreateRoortNamesCount = -1
  let programCount = -1
  let oldProgramIsUndefied = false
  //diagnostics
  let fileName = ""
  let watcher: ts.WatchOfConfigFile<ts.SemanticDiagnosticsBuilderProgram> | undefined
  let diagnosticMessageText = ""
  const awaiter = new Promise<void>(async resolve => {
    watcher = await createSemanticDiagnosticsWatchProgram({
      rootPath,
      onCreateProgram({ rootNames, oldProgram }) {
        if (onCreate === false) {
          onCreate = true
          oldProgramIsUndefied = oldProgram === undefined
          programCreateRoortNamesCount = rootNames?.length ?? -1
        }
      },
      onProgramCreated({ program }) {
        if (onCreated === false) {
          onCreated = true
          programCount = program.getSourceFiles().length
        }
      },
      onReportDiagnostic({ diagnostic }) {
        // console.log("HER: " + diagnostic.messageText)
        if (/\/test\.ts$/.test(diagnostic.file?.fileName ?? "")) {
          fileName = diagnostic.file?.fileName ?? ""
          diagnostic.messageText = diagnosticMessageText
          resolve()
        }
      },
    })
  })

  await Bun.write(testFilePath, `export test = "test"\n`)
  await awaiter
  watcher?.close()
  await Bun.write(testFilePath, `export const test = "test"\n`)

  //create program
  expect(onCreate).toBeTrue()
  expect(onCreated).toBeTrue()
  expect(onCreated).toBeTrue()
  expect(programCreateRoortNamesCount).toBe(2)
  expect(oldProgramIsUndefied).toBeTrue()

  //diagnostics
  expect(diagnosticMessageText).toBe("")
  expect(fileName).toBe(testFilePath)
})
