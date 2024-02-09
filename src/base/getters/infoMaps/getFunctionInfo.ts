import * as ts from 'typescript'
import { getModifierLikes } from 'src/base/getters/nodePropertyGetters/getModifierLikes'

export type FunctionInfo = {
  name: {
    text: string | undefined
    start: number | undefined
    end: number | undefined
  }
  text: string
  start: number
  end: number
  body: {
    start: number
    end: number
    text: string
  }
  statements: {
    start: number
    end: number
    text: string
  }[]
  parameters: {
    name: string
    type: string | undefined
    text: string
    start: number
    end: number
  }[]
  modifiers: {
    text: string
    start: number
    end: number
  }[]
}

export function getFunctionInfo(node: ts.FunctionDeclaration) {
  const name = {
    text: node.name?.getText(),
    start: node.name?.getStart(),
    end: node.name?.getEnd(),
  }
  if (!node.body) {
    throw new Error(
      `Function ${name.text} do not have a body. Information can not be extracted.`,
    )
  }
  const text = node.getText()
  const start = node.getStart()
  const end = node.getEnd()
  const body = {
    start: node.body.getStart(),
    end: node.body.getEnd(),
    text: node.body.getText(),
  }
  var statements = node.body.statements.map((s) => {
    return {
      start: s.getStart(),
      end: s.getEnd(),
      text: s.getText(),
    }
  })
  const parameters = node.parameters.map((p) => {
    return {
      name: p.name.getText(),
      type: p.type?.getText(),
      text: p.getText(),
      start: p.getStart(),
      end: p.getEnd(),
    }
  })
  const modifiers = getModifierLikes(node).map((m) => {
    return {
      text: m.getText(),
      start: m.getStart(),
      end: m.getEnd(),
    }
  })

  return {
    name,
    text,
    start,
    end,
    body,
    statements,
    parameters,
    modifiers,
  } satisfies FunctionInfo
}
