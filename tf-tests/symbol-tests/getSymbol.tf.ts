import { createProgramFromCode } from 'src/base'
import * as ts from 'typescript'

const fileName = 'file.ts'
const code1 = `
const a = 1
`
const program = createProgramFromCode(code1, { fileName: fileName })
const sourceFile = program.getSourceFile(fileName)

getSymbolFromIdentifier
