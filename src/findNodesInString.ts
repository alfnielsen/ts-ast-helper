import * as ts from "typescript"
import { createProgramFromString } from "./program/createProgramFromString"
import { getIdentifier } from "./nodeUtils/getIdentifier"

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

export default async function findNodesInString(code: string, opt: FindNodeInStringOptions): Promise<ts.Node[]> {
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

  let foundNode: ts.Node[] = []

  function visit(
    node: ts.Node,
    sourceFile: ts.SourceFile,
    program: ts.Program,
    ancestors: ts.Node[],
    parent?: ts.Node
  ) {
    if (foundNode) return
    function testNode() {
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
      if (name && getIdentifier(node)) {
        const nodeName = node.name.getText()
        if (typeof name === "string" && nodeName !== name) {
          return
        } else if (Array.isArray(name) && !name.includes(nodeName)) {
          return
        } else if (name instanceof RegExp && !name.test(nodeName)) {
          return
        }
      }
      if (not && not({ node, sourceFile, program, parent, ancestors })) {
        return
      }
      if (must && !must({ node, sourceFile, program, parent, ancestors })) {
        return
      }
      if (match) {
        const nodeText = node.getText(sourceFile)
        if (typeof match === "string" && nodeText !== match) {
          return
        } else if (match instanceof RegExp && !match.test(nodeText)) {
          return
        }
      }
      foundNode.push(node)
    }
    testNode()
    const nextAncestorList = [node, ...ancestors]
    node.forEachChild(child => visit(child, sourceFile, program, nextAncestorList, node))
  }

  visit(sourceFile, sourceFile, program, [])

  return foundNode
}
