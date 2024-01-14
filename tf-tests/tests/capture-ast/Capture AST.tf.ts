import * as ts from "typescript"
import { $, $log, colorize } from "../../colorize"

interface NodeDoc {
  name?: string
  type: ts.SyntaxKind
  typeString: string
  content: string
  start: number
  fullStart: number
  end: number
  fileName?: string
  children: NodeDoc[]
  sourceFile: ts.SourceFile
}

type HasId = {
  name: {
    getText(): string
  }
}
function HasName(item: any): item is HasId {
  return !!item.name
}

/** Generate documentation for all classes in a set of .ts files */
function GenerateAST(fileNames: string[], options: ts.CompilerOptions): void {
  // Build a program using the set of root file names in fileNames
  fileNames = fileNames.map(x => import.meta.dir + `/${x}`)
  let program = ts.createProgram(fileNames, options)

  // Get the checker, we will use it to find more about classes
  let checker = program.getTypeChecker()
  let root: NodeDoc | undefined

  // Visit every sourceFile in the program
  for (const sourceFile of program.getSourceFiles()) {
    const isNodeModule = /\/node_modules\//.test(sourceFile.fileName)
    if (isNodeModule) {
      continue
    }
    if (!sourceFile.isDeclarationFile) {
      console.log("sourceFile:", sourceFile.fileName)
      const content = sourceFile.getFullText()
      root = {
        children: [],
        start: sourceFile.end - content.length,
        fullStart: sourceFile.getFullStart(),
        end: sourceFile.end,
        content,
        type: sourceFile.kind,
        typeString: ts.SyntaxKind[sourceFile.kind],
        name: "",
        sourceFile,
      }
      // Walk the tree to search for classes
      ts.forEachChild(sourceFile, child => visit(sourceFile, child, root!))
    }
  }
  if (!root) {
    $log.red("vTest: No sourceFile found")
    return
  }

  let simpleRoot = ""

  const simplefy = (node: NodeDoc, level = 1) => {
    const fullContent = node.sourceFile.getFullText()
    const fullSourceLines = fullContent.split("\n")
    const lines = node.content.replace(/^\n*/, "").split("\n")
    const indent = colorize("gray", "| ".repeat(level))

    const { line: realLine, character: realChar } = node.sourceFile.getLineAndCharacterOfPosition(node.fullStart)
    const { line: startLine, character: startChar } = node.sourceFile.getLineAndCharacterOfPosition(node.start)
    const { line: endLine, character: endChar } = node.sourceFile.getLineAndCharacterOfPosition(node.end)

    const addArrow = fullSourceLines.toSpliced(startLine < 0 ? 0 : startLine, 0, " ".repeat(startChar) + $.reset + "↓")

    const c = addArrow.slice(realLine < 3 ? 0 : realLine - 3, startLine + 3)
    // console.log('SS:', fullSourceLines.join('\n'))
    // console.log('addArrow:', addArrow.join('\n'))
    // console.log('REAL:', realLine - 3, startLine + 3, c.join('\n'))

    if (node.name) {
      const posLabel = `[$reset line:$gray${realLine}/${startLine} $reset:char:$gray${startChar}$reset - line:$gray${endLine}$reset char:$gray${endChar} ] ( $reset:index:$gray${node.fullStart}/${node.start}-${node.end} )`
      let content = c.map((x, index) => `${indent} $gray${realLine + index + 1} $green${x}`).join("\n")
      simpleRoot += `\n${indent}$yellow${node.name} $blue${node.typeString} $gray${posLabel} \n${content}$reset`
    } else {
      const posLabel = `[$gray:line: ${startLine} char:${startChar} ] ( index:${node.start}-${node.end} ) $reset`
      let content = fullContent.substring(node.start, node.end).replace("\n", " ").slice(0, 40)
      simpleRoot += `\n${indent}$blue${node.typeString}$gray ${posLabel}$green ${content} $reset`
    }
    node.children.forEach(child => simplefy(child, level + 1))
  }
  simplefy(root!)

  // print out the doc
  //   fs.writeFileSync('classes.json', JSON.stringify(output, undefined, 4))
  $log.cyan("NodeDoc:")
  $log(simpleRoot)
  $log.gray("─".repeat(40))

  return

  /** visit nodes finding exported classes */
  function visit(sourceFile: ts.SourceFile, node: ts.Node, parent: NodeDoc) {
    // Only consider exported nodes
    let symbol = checker.getAnyType()
    const content = node.getFullText()
    const nodeDoc: NodeDoc = {
      children: [],
      start: node.getStart(),
      fullStart: node.getFullStart(),
      end: node.end,
      content,
      type: node.kind,
      typeString: ts.SyntaxKind[node.kind],
      name: "",
      sourceFile,
    }
    if (ts.isClassDeclaration(node)) {
      node.name
    }
    if (HasName(node)) {
      nodeDoc.name = node.name.getText()
    }
    parent.children.push(nodeDoc)

    ts.forEachChild(node, child => visit(sourceFile, child, nodeDoc))
  }
}

GenerateAST(["Test1.ts"], {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
})
