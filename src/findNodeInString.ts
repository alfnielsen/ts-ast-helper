import * as ts from "typescript"
import { createProgramFromString } from "./program/createProgramFromString"
import { getNodeName } from "./getNodeName"
import { findNodeVisitor } from "./visitors/findNodeVisitor"

export type NodeMatchMethod = (opt?: NodeMatchMethodArguments) => boolean
export type NodeMatchMethodArguments = {
  node: ts.Node
  sourceFile: ts.SourceFile
  program: ts.Program
  parent?: ts.Node
  ancestors?: ts.Node[]
  capture?: boolean
}

export type FindNodeInStringOptions = {
  name?: string | string[] | RegExp
  kind?: ts.SyntaxKind | ts.SyntaxKind[]
  must?: NodeMatchMethod
  not?: NodeMatchMethod
  after?: number
  before?: number
  match?: string | RegExp
}

export default async function findNodeInString<TNode extends ts.Node = ts.Node>(
  code: string,
  opt: FindNodeInStringOptions
): Promise<TNode | undefined> {
  let {
    name,
    kind,
    must,
    not,
    after,
    before,
    match,
    //
  } = opt
  const fileName = "file.ts"
  const program = await createProgramFromString(code, { fileName })
  const sourceFile = program.getSourceFile(fileName)!
  console.log("sourceFile", !!sourceFile)

  const foundNode = findNodeVisitor(sourceFile, () => {})

  function visit(
    node: ts.Node,
    sourceFile: ts.SourceFile,
    program: ts.Program,
    ancestors: ts.Node[],
    parent?: ts.Node
  ) {
    if (foundNode) return
    function testNode() {
      if (node.kind === ts.SyntaxKind.SourceFile) {
        console.log("---------SourceFile----")
        console.log(node.getText())
        console.log("-------------")
        return
      }
      if (after && node.end < after) {
        return
      }
      if (before && node.getStart(sourceFile) > before) {
        return
      }
      if (kind) {
        if (typeof node.kind === "string" && node.kind !== kind) {
          return
        } else if (Array.isArray(kind) && !kind.includes(node.kind)) {
          return
        }
      }
      if (name) {
        const nodeName = getNodeName(node, sourceFile)
        console.log(":Test for name:", name)
        console.log(":Node name:", nodeName)
        // console.log(":Node name+text:", name, nodeName, node.getText(sourceFile))
        if (!nodeName) {
          console.log(`<-1.0) Name dont match : nodeName: ${nodeName}`)
          return
        }
        console.log("1)", node.getFullText())
        if (typeof name === "string" && nodeName !== name) {
          console.log(`<-1.1) `)
          return
        } else if (Array.isArray(name) && !name.includes(nodeName)) {
          console.log(`<-1.2) `)
          return
        } else if (name instanceof RegExp && !name.test(nodeName)) {
          console.log(`<-1.3) `)
          return
        }
      }
      console.log("2) not/must test")
      if (not && not({ node, sourceFile, program, parent, ancestors })) {
        console.log("<-.12) not test")
        return
      }
      if (must && !must({ node, sourceFile, program, parent, ancestors })) {
        console.log("<-.12) must test")
        return
      }
      console.log("3) match")
      if (match) {
        const nodeText = node.getText(sourceFile)
        console.log("3.1) is match:", nodeText)
        if (typeof match === "string" && nodeText !== match) {
          console.log("<-3.1)")
          return
        } else if (match instanceof RegExp && !match.test(nodeText)) {
          console.log("<-3.2)")
          return
        }
      }
      console.log("4) node found")
      return node as TNode
    }
    console.log(`-------------${ts.SyntaxKind[node.kind]}-------`)
    console.log("## Name: ", getNodeName(node) ?? "-")
    const succesFoundNode = testNode()
    if (succesFoundNode) {
      console.log(`succesFoundNode found`)
      foundNode = succesFoundNode
      return
    }

    const nextAncestorList = [node, ...ancestors]
    node.forEachChild(child => visit(child, sourceFile, program, nextAncestorList, node))
  }

  visit(sourceFile, sourceFile, program, [])

  return foundNode
}
