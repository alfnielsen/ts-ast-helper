import * as ts from 'typescript'
import { createSourceFileFromCode } from 'src/base/sourceFile/createSourceFileFromCode'
import {
  resetColor,
  getColor,
  logDecription,
  type LogColor,
  log,
} from 'src/util/LogUtil'
import { HNode } from 'src/experimental/helperTree/HNode'
import { isType } from 'src/util/Checks'

export type HTreeVisitOptions = {
  node?: HNode
  depth?: number | 'all'
  visitor: (
    node: HNode,
    opt: HTreeVisitVisitorRunOptions,
  ) => undefined | void | true
}

export type HTreeVisitVisitorOptions = {
  depth?: number | 'all'
}

export type HTreeVisitVisitorRunOptions = {
  siblingIndex: number
  siblingCount: number
  depth: number
  maxDepth: number
  stopped: boolean
}

export type HTreePrintTreeLogger = (content: string, node?: HNode) => void

export type HTreePrintTreeOptions = {
  logger?: HTreePrintTreeLogger
  indent?: number | string
  indentionPostfix?: string
  firstIndentionPostfix?: string
  lastIndentionPostfix?: string
  textSnippet?: number | boolean
  includeName?: boolean
  includeLineCount?: boolean
  printText?: boolean
  printInfo?: boolean
  omitKind?:
    | ts.SyntaxKind
    | typeof ts.SyntaxKind
    | (ts.SyntaxKind | typeof ts.SyntaxKind)[]
  markKind?:
    | ts.SyntaxKind
    | typeof ts.SyntaxKind
    | (ts.SyntaxKind | typeof ts.SyntaxKind)[]
  deMarkKind?:
    | ts.SyntaxKind
    | typeof ts.SyntaxKind
    | (ts.SyntaxKind | typeof ts.SyntaxKind)[]
  printMarkedOnly?: boolean
  printMarkInfo?: boolean
  printMarkText?: boolean
  indentColor?: LogColor
  nameColor?: LogColor
  kindColor?: LogColor
  noteColor?: LogColor
}

export class HTree {
  code: string = ''
  errorMessage?: string
  error?: any
  rootNode = new HNode()
  allNode: HNode[] = []
  namedNodeMap: Record<string, HNode> = {}

  setCode(code: string | ts.Node, compile = true) {
    if (typeof code === 'string') {
      this.code = code
    } else {
      try {
        this.code = code.getText()
      } catch (e) {
        this.errorMessage = `The ts.Node dont have a text (or position) - error: ${e}`
        this.error = e
      }
    }
    if (compile) {
      this.compile()
    }
    return this
  }
  compile(code?: string) {
    if (code) {
      this.code = code
    }
    const sourceFile = createSourceFileFromCode(this.code)
    const visitor = (node: ts.Node, parent: HNode, depth: number) => {
      const hNode = HNode.fromTsNode(node, parent, depth)
      this.allNode.push(hNode)
      parent.children.push(hNode)
      if (hNode.name) {
        let key = hNode.name
        let parent = hNode.parent
        while (parent) {
          if (parent.name) {
            key = parent.name + '.' + key
          }
          parent = parent.parent
        }
        this.namedNodeMap[key] = hNode
      }
      ts.forEachChild(node, (child) => visitor(child, hNode, depth + 1))
    }
    this.rootNode = HNode.fromTsNode(sourceFile)
    ts.forEachChild(sourceFile, (child) => visitor(child, this.rootNode, 1))
    return this
  }
  visit(opt: HTreeVisitOptions) {
    const { node = this.rootNode, depth = 'all', visitor } = opt
    let maxDepth = depth === 'all' ? 100 : depth
    let stopped = false
    const childVisitor = (node: HNode, opt: HTreeVisitVisitorRunOptions) => {
      if (stopped || depth === maxDepth) {
        stopped = true
        opt.stopped = true
        return
      }
      const stop = visitor(node, opt)
      if (stop === true) return true
      // children visit
      let nextDepth = opt.depth + 1
      let siblingIndex = 0
      let siblingCount = node.children.length
      for (const child of node.children) {
        let shouldStop = childVisitor(child, {
          depth: nextDepth,
          maxDepth,
          stopped,
          siblingIndex,
          siblingCount,
        })
        siblingIndex += 1
        if (shouldStop) {
          stopped = true
          opt.stopped = true
          return true
        }
      }
    }

    childVisitor(node, {
      depth: 0,
      maxDepth,
      stopped,
      siblingIndex: 0,
      siblingCount: node.children.length,
    })
  }
  printTree(opt?: HTreePrintTreeOptions) {
    const {
      logger = console.log,
      textSnippet = 45,
      includeName = true,
      includeLineCount = true,
      indent = '│',
      firstIndentionPostfix = '┮╴',
      indentionPostfix = '┝╴',
      lastIndentionPostfix = '┕╴',
      markKind,
      deMarkKind,
      indentColor = 'green',
      nameColor = 'green',
      kindColor = 'white',
      noteColor = 'gray',
      printMarkedOnly = false,
      printMarkInfo = true,
      printMarkText = true,
      omitKind,
      printText = false,
      printInfo = false,
    } = opt ?? {}
    let snippetLength =
      textSnippet === true ? 45 : textSnippet === false ? 0 : textSnippet
    let baseIndention = typeof indent === 'number' ? ' '.repeat(indent) : indent
    this.visit({
      node: this.rootNode,
      visitor: (node, { siblingIndex, siblingCount, depth }) => {
        let kind = node.tsKind
        if (isType(kind, omitKind)) {
          return
        }
        let indention = baseIndention.repeat(depth)
        let note = node.text.substring(0, snippetLength).replace(/\n/g, '↵')
        if (note.length > 0) {
          note = '  ' + note
        }
        if (node.text.length > snippetLength) {
          note += '...'
        }
        let lineCount = node.text.split('\n').length
        if (includeLineCount && lineCount > 1) {
          note += ` [lines: ${lineCount}]`
        }
        if (firstIndentionPostfix && siblingIndex === 0) {
          indention += firstIndentionPostfix
        } else if (lastIndentionPostfix && siblingIndex === siblingCount - 1) {
          indention += lastIndentionPostfix
        } else if (indentionPostfix) {
          indention += indentionPostfix
        }
        let name = includeName && node.name ? `(${node.name}): ` : ''

        let _indentColor = getColor(indentColor)
        let _nameColor = getColor(nameColor)
        let _kindColor = getColor(kindColor)
        let _noteColor = getColor(noteColor)
        let isDeMarkedType = isType(node.tsKind, deMarkKind)
        if (isDeMarkedType) {
          _indentColor = getColor('gray')
          _nameColor = getColor('gray')
          _kindColor = getColor('gray')
          _noteColor = getColor('gray')
        }
        let isMarkedType = isType(node.tsKind, markKind)
        if (markKind && !isMarkedType) {
          if (printMarkedOnly) {
            return
          }
          _indentColor = getColor('gray')
          _nameColor = getColor('gray')
          _kindColor = getColor('gray')
          _noteColor = getColor('gray')
        }
        logger(
          _indentColor +
            indention +
            resetColor +
            _nameColor +
            name +
            resetColor +
            _kindColor +
            node.tsKindText +
            _noteColor +
            note +
            resetColor,
        )
        if (isMarkedType) {
          // marked
          if (printMarkInfo) {
            log('Info: ', 'cyan')
            logDecription(node.getJsonString())
          }
          if (printMarkText) {
            log('Text: ', 'cyan')
            logDecription(node.text)
          }
          return
        }
        // all
        if (printInfo) {
          log('Info: ', 'cyan')
          logDecription(node.getJsonString())
        }
        if (printText) {
          log('Text: ', 'cyan')
          logDecription(node.text, 'gray')
        }
      },
    })
  }

  getJsonData(excludeNodes = false) {
    return {
      code: this.code,
      errorMessage: this.errorMessage,
      error: this.error,
      node: excludeNodes ? undefined : this.rootNode.getJsonData(),
    }
  }

  getJsonString(excludeNodes = false) {
    return JSON.stringify(this.getJsonData(excludeNodes), null, 2)
  }
}

export const Tree = (code?: string) => {
  const hTree = new HTree()
  if (code) {
    hTree.setCode(code).compile()
  }
  return hTree
}

export default HTree
