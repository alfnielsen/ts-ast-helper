import * as ts from 'typescript'
import { Tree } from 'src/experimental/helperTree/HTree'

const code = `
const code = \`
import * as ts from "typescript"
\`
function foo(input: string, ...rest: number[]) {
  let v = rest.map((r) => r + '.00').join(',')
  return {
    test() {
      function p(max = 3) {
        v += ' : '
        p(max - 1)
      }
      p()
      v += input
    },
    clear: () => {
      v = ''
    },
  }
}

foo('Runner: ', 1, 2, 3)


`

Tree(code).printTree({
  deMarkKind: [ts.SyntaxKind.Identifier, ts.SyntaxKind.ArrowFunction],
})

console.log('--------------------------')
