import * as ts from "typescript"
import { createProgramFromString } from "./program/createProgramFromString"
import { getNodeName } from "./nodeUtils/getNodeName"
import { findNodeVisitor } from "./visitors/findNodeVisitor"
import { endAfterIndex, endBeforeIndex, startAfterIndex, startBeforeIndex } from "./nodeUtils/testIndex"

export type NodeMatchMethod = (opt: NodeMatchMethodArguments) => boolean
export type NodeMatchMethodArguments = {
  node: ts.Node
  sourceFile: ts.SourceFile
  program: ts.Program
  parent?: ts.Node
  ancestors?: ts.Node[]
}

export type FindNodeInStringOptions = {
  name?: string | string[] | RegExp
  kind?: ts.SyntaxKind | (keyof typeof ts.SyntaxKind | ts.SyntaxKind)[] | keyof typeof ts.SyntaxKind
  must?: NodeMatchMethod
  not?: NodeMatchMethod
  startAfter?: number
  startBefore?: number
  endAfter?: number
  endBefore?: number
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
    startAfter,
    startBefore,
    endAfter,
    endBefore,
    match,
    //
  } = opt
  const fileName = "file.ts"
  const program = await createProgramFromString(code, { fileName })
  const sourceFile = program.getSourceFile(fileName)!

  return findNodeVisitor<TNode>(sourceFile, (node, parent, ancestors) => {
    if (startAfter !== undefined && !startAfterIndex(node, startAfter)) {
      return
    }
    if (startBefore !== undefined && !startBeforeIndex(node, startBefore)) {
      return
    }
    if (endAfter !== undefined && !endAfterIndex(node, endAfter)) {
      return
    }
    if (endBefore !== undefined && !endBeforeIndex(node, endBefore)) {
      return
    }
    if (kind) {
      if (typeof kind === "string" && node.kind !== ts.SyntaxKind[kind as keyof typeof ts.SyntaxKind]) {
        return
      } else if (
        Array.isArray(kind) &&
        !kind.map(k => (typeof k === "string" ? ts.SyntaxKind[k] : k)).includes(node.kind)
      ) {
        return
      } else if (typeof kind === "number" && node.kind !== kind) {
        return
      }
    }
    if (name) {
      const nodeName = getNodeName(node)
      if (!nodeName) {
        return
      }
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
    return true
  })
}
