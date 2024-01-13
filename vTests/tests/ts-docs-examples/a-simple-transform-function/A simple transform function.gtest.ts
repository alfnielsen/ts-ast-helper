import * as ts from 'typescript'

const source = "let x: string  = 'string'"

let result = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
})

console.log(JSON.stringify(result, null, 2))
console.log('─'.repeat(40))
