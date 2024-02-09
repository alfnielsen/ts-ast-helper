import * as ts from 'typescript'
import fs from 'fs'
import {
  createProgramFromCode,
  type CreateProgramFromStringOptions,
} from './createProgramFromCode'

export type CreateProgramFromPathOptions = CreateProgramFromStringOptions & {}
export type ReturnType = ts.Program

export const createProgramFromFile = async (
  filePath: string,
  opt?: CreateProgramFromPathOptions,
): Promise<ts.Program> => {
  const code = fs.readFileSync(filePath, 'utf8')
  return createProgramFromCode(code, opt)
}
