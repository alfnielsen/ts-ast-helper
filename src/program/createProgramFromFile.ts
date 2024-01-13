import * as ts from "typescript"
import fs from "fs"
import { CreateProgramFromStringOptions, createProgramFromString } from "./createProgramFromString"

export type CreateProgramFromPathOptions = CreateProgramFromStringOptions & {}
export type ReturnType = ts.Program

export const createProgramFromFile = async (
  filePath: string,
  opt?: CreateProgramFromPathOptions
): Promise<ts.Program> => {
  const code = fs.readFileSync(filePath, "utf8")
  return createProgramFromString(code, opt)
}
