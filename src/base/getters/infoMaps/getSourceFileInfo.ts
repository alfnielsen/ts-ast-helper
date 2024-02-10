import * as ts from 'typescript'
import {
  getImportInfo,
  type ImportInfo,
} from 'src/base/getters/infoMaps/getImportInfo'
import {
  getStatementInfo,
  type StatementInfo,
} from 'src/base/getters/infoMaps/getStatementInfo'
import {
  getFunctionInfo,
  type FunctionInfo,
} from 'src/base/getters/infoMaps/getFunctionInfo'
import {
  getVariableStatementInfo,
  type VariableStatementInfo,
} from 'src/base/getters/infoMaps/getVariableStatementInfo'
import {
  getNodeInfo,
  type NodeInfo,
} from 'src/base/getters/infoMaps/getNodeInfo'

export type SourceFileInfo = NodeInfo & {
  text: string
  deps: { name?: string; path: string }[]
  fileName: string
  hasNoDefaultLib: boolean
  isDeclarationFile: boolean
  moduleName?: string
  referencedFiles: {
    fileName: string
    pos: number
    end: number
    resolutionMode: string
  }[]
  typeReferenceDirectives: {
    fileName: string
    pos: number
    end: number
    resolutionMode: string
  }[]
  statements: StatementInfo[]
  imports: ImportInfo[]
  functions: FunctionInfo[]
  variables: VariableStatementInfo[]
}

export function getSourceFileInfo(node: ts.SourceFile) {
  const nodeInfo = getNodeInfo(node)
  const deps = node.amdDependencies.map((d) => ({ name: d.name, path: d.path }))
  const fileName = node.fileName
  const hasNoDefaultLib = node.hasNoDefaultLib
  const isDeclarationFile = node.isDeclarationFile
  const moduleName = node.moduleName

  const referencedFiles = node.referencedFiles.map((r) => ({
    fileName: r.fileName,
    pos: r.pos,
    end: r.end,
    resolutionMode: r.resolutionMode ? ts.ModuleKind[r.resolutionMode] : '',
  }))
  const typeReferenceDirectives = node.typeReferenceDirectives.map((d) => ({
    fileName: d.fileName,
    pos: d.pos,
    end: d.end,
    resolutionMode: d.resolutionMode ? ts.ModuleKind[d.resolutionMode] : '',
  }))
  const statements = node.statements.map(getStatementInfo)
  const imports = node.statements
    .filter((s) => ts.isImportDeclaration(s))
    .map((s) => getImportInfo(s as ts.ImportDeclaration))

  const functions = node.statements
    .filter((s) => ts.isFunctionDeclaration(s))
    .map((s) => getFunctionInfo(s as ts.FunctionDeclaration))

  const variables = node.statements
    .filter((s) => ts.isVariableStatement(s))
    .map((s) => getVariableStatementInfo(s as ts.VariableStatement))

  return {
    ...nodeInfo,
    deps,
    fileName,
    hasNoDefaultLib,
    isDeclarationFile,
    moduleName,
    referencedFiles,
    typeReferenceDirectives,
    statements,
    imports,
    functions,
    variables,
  } satisfies SourceFileInfo
}
