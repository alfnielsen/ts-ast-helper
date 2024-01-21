import { test, expect } from "bun:test"
import { createProgramFromFile } from "../../src/base/program/createProgramFromFile"
import { join } from "path"

test("createProgramFromFile", async () => {
  const filePath = join(import.meta.dir, `test-file.ts`)

  const program = await createProgramFromFile(filePath)

  expect(program.getSourceFiles().length).toBe(1)
  expect(program.getSourceFiles()[0].getText()).toBe('console.log("hello from test")\n')
})
