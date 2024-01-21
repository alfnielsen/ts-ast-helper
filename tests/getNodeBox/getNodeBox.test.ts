import { test, expect } from "bun:test"
import { createProgramFromString } from "../../src/base/program/createProgramFromString"
import { getNodeBox } from "../../src/getNodeBox"

test("createProgramFromString", async () => {
  const base = `123456789012345678901234567890`

  const programBase = await createProgramFromString(base)
  const sourceFileBase = programBase.getSourceFile("file.ts")
  expect(sourceFileBase).toBeDefined()
  const boxBase = getNodeBox(sourceFileBase!)

  expect(boxBase.width).toBe(30)
  expect(boxBase.height).toBe(1)

  const base2 = `123456789012345678901234567890\n1234567890`

  const programBase2 = await createProgramFromString(base2)
  const sourceFileBase2 = programBase2.getSourceFile("file.ts")
  expect(sourceFileBase2).toBeDefined()
  const boxBase2 = getNodeBox(sourceFileBase2!)

  expect(boxBase2.width).toBe(30)
  expect(boxBase2.height).toBe(2)

  const code = `
123456789012345678901234567890
  console.log("hello world")
  const foo = 42;
  `
  const program = await createProgramFromString(code)
  const sourceFile = program.getSourceFile("file.ts")
  expect(sourceFile).toBeDefined()
  const box = getNodeBox(sourceFile!)

  expect(box.width).toBe(30)
  expect(box.height).toBe(5)
})
