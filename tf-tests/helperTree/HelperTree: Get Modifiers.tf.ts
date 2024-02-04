import * as ts from 'typescript'
import { Tree } from 'src/experimental/helperTree/HTree'

const code = `
export async function foo1(input: string, ...rest: number[]) {
    return 1
}

export const foo2 = async (input: string) => {

}

export async function foo3(input: string): Promise<number> {

}

export const foo4 = async (input: string, ...rest: number[]) => {
    return "hello"
}

class C {
    /**
     * constructor documentation
     * @param a my parameter documentation
     * @param b another parameter documentation
     */
    constructor(a: string, b: C) { }
}

`
Tree(code).printTree({
  markKind: [ts.SyntaxKind.FunctionDeclaration, ts.SyntaxKind.ArrowFunction],
  printMarkInfo: true,
  //  printMarkText: true,
  printMarkedOnly: true,
})
