import * as ts from 'typescript'
import { getModifiers } from 'src/base/getters/nodePropertyGetters/getModifiers'
import { getName } from 'src/base/getters/nodePropertyGetters/getName'
import { getParameters } from 'src/base/getters/nodePropertyGetters/getParameters'
import { HParameter } from 'src/experimental/helperTree/HParameter'
import { nodeKind } from 'src/base/printer/nodeKind'
import { createProgramFromCode } from 'src/base/program/createProgramFromCode'
import { isExported } from 'src/base/nodeMatch/is/isExported'

export class HNode {
  public comments: string = ''
  public text: string = ''
  public tsKind?: ts.SyntaxKind
  public tsKindText?: string = ''
  public name?: string
  /** Full start include comments */
  public commentsStart: number = 0
  /** start for code */
  public start: number = 0
  public end: number = 0
  public children: HNode[] = []
  public parent?: HNode
  public tsNode?: ts.Node
  public depth: number = 0
  public modifier: string[] = []
  public parameters: HParameter[] = [] // add proper type later
  public returnType?: string
  public isExported: boolean = false

  constructor() {}

  static new(
    data: Partial<{
      [Property in keyof HNode]: HNode[Property]
    }>,
  ) {
    const hNode = new HNode()
    Object.assign(hNode, data)
    return hNode
  }

  static fromTsNode(node: ts.Node, parent?: HNode | ts.Node, depth = 0) {
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isArrowFunction(node) ||
      ts.isVariableDeclarationList(node)
    ) {
      //const program = createProgramFromNodeWithSourceFile(node)
      const sourceFile = node.getSourceFile()
      const program = createProgramFromCode(node.getText(), {
        fileName: 'file.ts',
        sourceFile,
      })
      const checker = program.getTypeChecker()
      let statement = sourceFile!.statements[0] as
        | ts.FunctionDeclaration
        | ts.FunctionExpression
        | ts.ArrowFunction
      if (ts.isVariableDeclarationList(sourceFile!.statements[0])) {
        function matchFunc(node: ts.VariableDeclarationList) {
          if (variableDeclarationList.declarations.length != 1) {
            return
          }
          const varDelc = variableDeclarationList
            .declarations[0] as ts.VariableDeclaration
          if (varDelc.initializer === undefined) {
            return
          }
          if (
            !ts.isArrowFunction(varDelc.initializer) &&
            !ts.isFunctionExpression(varDelc.initializer)
          ) {
            return
          }
          return varDelc.initializer
        }
        const variableDeclarationList = sourceFile!
          .statements[0] as ts.VariableDeclarationList
        const func = matchFunc(variableDeclarationList)
        if (func) {
          statement = func
        }
      }

      if (
        ts.isFunctionDeclaration(statement) ||
        ts.isMethodDeclaration(statement) ||
        ts.isFunctionExpression(statement) ||
        ts.isArrowFunction(statement)
      ) {
        console.log('FUNC kind', nodeKind(statement))

        let symbol = checker.getSymbolAtLocation(statement)
        console.log('symbol:', symbol?.getEscapedName())

        if (symbol) {
          const f = {
            name: symbol.getName(),
            documentation: ts.displayPartsToString(
              symbol.getDocumentationComment(checker),
            ),
            type: checker.typeToString(
              checker.getTypeOfSymbolAtLocation(
                symbol,
                symbol.valueDeclaration!,
              ),
            ),
          }
          console.log('--symbol:', f)
        }

        const retType = checker
          .getSignatureFromDeclaration(statement)!
          .getReturnType()
        const rr = checker.typeToString(retType)
        console.log('retType:', rr)
        const signature = checker.getSignatureFromDeclaration(statement)
        const parameters = signature
          ?.getParameters()
          .map((p) => p.valueDeclaration?.getText())
        console.log('parameters:', parameters)
        const returnType = signature?.getReturnType().symbol?.name
        console.log('returnType:', returnType)
        const typeParameters = signature?.getTypeParameters()
        console.log(
          'typeParameters:',
          typeParameters?.map((p) => p.symbol.name),
        )

        console.log('declaration:', signature?.getDeclaration().getText())
        console.log(
          'declaration type:',
          signature?.getDeclaration().type?.getText(),
        )
        console.log(
          'signature:',
          signature
            ?.getDeclaration()
            .typeParameters?.[0]?.modifiers?.map((x) => x.getText()),
        )
        const returnTypeSymbol = retType.getSymbol()
        console.log('NAME:', returnTypeSymbol?.name)
        console.log('NAME:', returnTypeSymbol?.escapedName)

        const returnTypeName = returnTypeSymbol?.getName()
        const globalExports = returnTypeSymbol?.globalExports
        const declarations = returnTypeSymbol?.declarations
        const exports = returnTypeSymbol?.exports
        const flags = returnTypeSymbol?.flags
        const valueDeclaration = returnTypeSymbol?.valueDeclaration
        // console.log({
        //   returnTypeName,
        //   globalExports,
        //   declarations,
        //   exports,
        //   flags,
        //   valueDeclaration,
        // })
      }
    }

    const start = node.getStart()
    const commentsStart = node.getFullStart()
    const comments = node.getFullText().substring(0, start - commentsStart)
    if (parent && !(parent instanceof HNode)) {
      parent = HNode.fromTsNode(node.parent)
    }
    const hNode = HNode.new({
      text: node.getText(),
      name: getName(node),
      modifier: getModifiers(node).map((m) => m.getText()),
      parameters: getParameters(node).map((p) => HParameter.fromTsParameter(p)),
      start: node.getStart(),
      end: node.getEnd(),
      comments,
      commentsStart,
      parent: parent as HNode | undefined,
      tsNode: node,
      tsKind: node.kind,
      tsKindText: ts.SyntaxKind[node.kind],
      depth,
      isExported: isExported(node),
    })
    return hNode
  }

  getJsonData() {
    return {
      text: this.text,
      comments: this.comments,
      commentsStart: this.commentsStart,
      name: this.name,
      start: this.start,
      end: this.end,
      kind: this.tsKindText,
      modifier: this.modifier,
      parameters: this.parameters.map((p) => p.getJsonData()),
      returnType: this.returnType,
      isExported: this.isExported,
    }
  }

  getJsonString() {
    return JSON.stringify(this.getJsonData(), null, 2)
  }
}
