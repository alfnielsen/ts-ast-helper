import { readFileSync } from 'fs'
import * as ts from 'typescript'
import { terminalStyle as $ } from 'src/util/terminal/terminalColors'

const widthArg = process.argv
  .find(arg => arg.startsWith('--width='))
  ?.split('=')[1]
const width = widthArg ? parseInt(widthArg) : 40

/**
 * The Node interface is the root interface for the TypeScript AST. Generally, \
 * we use the forEachChild function in a recursive manner to iterate through the tree. \
 * This subsumes the visitor pattern and often gives more flexibility. \
 * \
 * As an example of how one could traverse a file's AST, \
 * consider a minimal linter that does the following: \
 * - Checks that all looping construct bodies are enclosed by curly braces.
 * - Checks that all if/else bodies are enclosed by curly braces.
 * - The "stricter" equality operators (===/!==) are used instead of the "loose" ones (==/!=).
 * @param sourceFile
 */
export function delint(sourceFile: ts.SourceFile) {
  delintNode(sourceFile)

  function delintNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ForStatement:
      case ts.SyntaxKind.ForInStatement:
      case ts.SyntaxKind.WhileStatement:
      case ts.SyntaxKind.DoStatement:
        if (
          (node as ts.IterationStatement).statement.kind !== ts.SyntaxKind.Block
        ) {
          report(
            node,
            "A looping statement's contents should be wrapped in a block body.",
          )
        }
        break

      case ts.SyntaxKind.IfStatement:
        const ifStatement = node as ts.IfStatement
        if (ifStatement.thenStatement.kind !== ts.SyntaxKind.Block) {
          report(
            ifStatement.thenStatement,
            "An if statement's contents should be wrapped in a block body.",
          )
        }
        if (
          ifStatement.elseStatement &&
          ifStatement.elseStatement.kind !== ts.SyntaxKind.Block &&
          ifStatement.elseStatement.kind !== ts.SyntaxKind.IfStatement
        ) {
          report(
            ifStatement.elseStatement,
            "An else statement's contents should be wrapped in a block body.",
          )
        }
        break

      case ts.SyntaxKind.BinaryExpression:
        const op = (node as ts.BinaryExpression).operatorToken.kind
        if (
          op === ts.SyntaxKind.EqualsEqualsToken ||
          op === ts.SyntaxKind.ExclamationEqualsToken
        ) {
          report(node, "Use '===' and '!=='.")
        }
        break
    }

    ts.forEachChild(node, delintNode)
  }

  function report(node: ts.Node, message: string) {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(
      node.getStart(),
    )
    console.log(
      `${$.gray}###### ${$.red}${sourceFile.fileName} ${$.gray} (line:${
        line + 1
      }, char:${character + 1}) ######${$.reset}`,
    )
    console.log(`${message}`)
    console.log(`${$.gray}${'─'.repeat(width)}${$.reset}\n`)
  }
}

const fileNames = ['test1.ts']

fileNames.forEach(fileName => {
  // Parse a file
  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true,
  )

  // delint it
  delint(sourceFile)
})
