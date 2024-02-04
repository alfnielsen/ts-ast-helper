import * as ts from 'typescript'
import { getModifiers } from 'src/base/getters/getModifiers'

export class HParameter {
  dotDotDotToken = false
  name = ''
  questionToken = false
  start = 0
  end = 0
  tsKind?: string
  modifiers: any[] = []
  tsNode?: ts.Node

  static fromTsParameter(node: ts.ParameterDeclaration) {
    const p = new HParameter()
    p.dotDotDotToken = !!node.dotDotDotToken
    p.name = node.name.getText()
    p.questionToken = !!node.questionToken
    p.start = node.getStart()
    p.end = node.getEnd()
    p.tsKind = ts.SyntaxKind[node.kind]
    p.modifiers = getModifiers(node).map((m) => m.getText())
    p.tsNode = node
    return p
  }

  getJsonData() {
    return {
      dotDotDotToken: this.dotDotDotToken,
      name: this.name,
      questionToken: this.questionToken,
      start: this.start,
      end: this.end,
      tsKind: this.tsKind,
      modifiers: this.modifiers,
    }
  }

  getJsonString() {
    return JSON.stringify(this.getJsonData(), null, 2)
  }
}
