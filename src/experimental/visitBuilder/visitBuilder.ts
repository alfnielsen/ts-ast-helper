import * as ts from 'typescript'
import fs from 'fs'
import { createProgramFromString } from '../../base/program/createProgramFromString'
import { createProgramFromSourceFile } from '../../base/program/createProgramFromSourceFile'

export class VisitBuilder {
  private currentNode = new VisitBuilderNodeMatch(this, '0')
  private nodeMatchList: VisitBuilderNodeMatch[] = [this.currentNode]
  private tsProgram?: ts.Program
  constructor(key?: string) {
    if (key) {
      this.setKey(key)
    }
  }
  program(program: ts.Program) {
    this.tsProgram = program
    return this
  }
  filePath(filePath: string) {
    const code = fs.readFileSync(filePath, 'utf8')
    return this.code(code)
  }
  code(code: string) {
    this.tsProgram = createProgramFromString(code)
    return this
  }
  sourceFile(sourcFile: ts.SourceFile) {
    this.tsProgram = createProgramFromSourceFile(sourcFile)
    return this
  }
  setKey(key: string) {
    this.currentNode.key = key
    return this
  }
  thenFind(key: string) {
    if (!key) {
      key = `${this.nodeMatchList.length}`
    }
    const matcher = new VisitBuilderNodeMatch(this, key)
    this.nodeMatchList.push(matcher)
    return this
  }
  name(...name: (string | string[] | RegExp)[]) {
    this.currentNode.name = name
    return this
  }
  kind(...kind: (ts.SyntaxKind | keyof typeof ts.SyntaxKind)[]) {
    kind.forEach((x) => {
      if (typeof x === 'string') {
        this.currentNode.kind.push(ts.SyntaxKind[x])
        return
      }
      this.currentNode.kind.push(x)
    })
    return this
  }
  type(
    type: (
      | VisitBuilderNodeMatchType
      | keyof typeof VisitBuilderNodeMatchType
    )[],
  ) {
    type.forEach((x) => {
      if (typeof x === 'string') {
        this.currentNode.type.push(VisitBuilderNodeMatchType[x])
        return
      }
      return this.currentNode.type.push(x)
    })
    return this
  }
  must(macther: NodeMatchMethod) {
    this.currentNode.must.push(macther)
    return this
  }
  not(macther: NodeMatchMethod) {
    this.currentNode.not.push(macther)
    return this
  }
  contectMatch(...matcher: (string | RegExp)[]) {
    matcher.forEach((m) => {
      this.currentNode.matchNodeContect.push(m)
    })
    return this
  }
  afterIndex(index: number) {
    this.currentNode.beforeIndex = index
    return this
  }
  beforeIndex(index: number) {
    this.currentNode.beforeIndex = index
    return this
  }
  maxContectLength(length: number) {
    this.currentNode.maxContentLength = length
    return this
  }
  minContectLength(length: number) {
    this.currentNode.minContectLength = length
    return this
  }

  runVisit() {
    if (!this.tsProgram) {
      throw new Error(
        "A program is not defined. Use one of methods: 'code', 'program', 'sourceFile' or 'filePath'",
      )
    }
  }
}

export const node = (key: string) => new VisitBuilder(key)

node('')

export class VisitBuilderNodeMatch {
  key: string
  name: (string | string[] | RegExp)[] = []
  kind: ts.SyntaxKind[] = []
  type: VisitBuilderNodeMatchType[] = []
  must: NodeMatchMethod[] = []
  not: NodeMatchMethod[] = []
  afterIndex?: number
  beforeIndex?: number
  matchNodeContect: (string | RegExp)[] = []
  maxContentLength?: number
  minContectLength?: number
  constructor(public visitBuilder: VisitBuilder, key: string) {
    this.key = key
  }
}

export enum VisitBuilderNodeMatchType {
  functionLike = 'functionLike',
  function = 'function',
  arrowFunction = 'arrowFunction',
  variable = 'variable',
}

export type NodeMatchMethod = (opt?: NodeMatchMethodArguments) => boolean
export type NodeMatchMethodArguments = {
  node: ts.Node
  sourceFile: ts.SourceFile
  program: ts.Program
  parent?: ts.Node
  ancestors?: ts.Node[]
  capture?: boolean
}
