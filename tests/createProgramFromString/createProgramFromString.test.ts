import { test, expect } from "bun:test"
import { createProgramFromString } from "../../src/program/createProgramFromString"

test("createProgramFromString", async () => {
  const code = `console.log("hello world")`
  const program = await createProgramFromString(code)

  expect(program).toBeDefined()
  expect(program.getCurrentDirectory).toBeFunction()
  expect(program.getRootFileNames).toBeFunction()
  expect(program.getSourceFiles).toBeFunction()
  expect(program.emit).toBeFunction()
  expect(program.getOptionsDiagnostics).toBeFunction()
  expect(program.getGlobalDiagnostics).toBeFunction()
  expect(program.getSyntacticDiagnostics).toBeFunction()
  expect(program.getSemanticDiagnostics).toBeFunction()
  expect(program.getDeclarationDiagnostics).toBeFunction()
  expect(program.getTypeChecker).toBeFunction()
  expect(program.getNodeCount).toBeFunction()
  expect(program.getIdentifierCount).toBeFunction()
  expect(program.getSymbolCount).toBeFunction()
  expect(program.getTypeCount).toBeFunction()
  expect(program.getInstantiationCount).toBeFunction()

  expect(program.getSourceFiles().length).toBe(1)
  expect(program.getSourceFiles()[0].getText()).toBe('console.log("hello world")')
})
