import * as ts from 'typescript'

export enum NodeTypeMap {
  Function = 'Function',
  ArrowFunction = 'ArrowFunction',
  Variable = 'Variable',
  Block = 'Block',
  Import = 'Import',
  Identifier = 'Identifier',
  TypeDefitionen = 'TypeDefitionen',
}

export const NodeTypeToKindMap: Record<
  keyof typeof NodeTypeMap,
  ts.SyntaxKind[]
> = {
  [NodeTypeMap.Function]: [ts.SyntaxKind.FunctionDeclaration],
  [NodeTypeMap.ArrowFunction]: [ts.SyntaxKind.ArrowFunction],
  [NodeTypeMap.Variable]: [
    ts.SyntaxKind.VariableDeclaration | ts.SyntaxKind.VariableDeclarationList,
  ],
  [NodeTypeMap.Block]: [ts.SyntaxKind.Block],
  [NodeTypeMap.Import]: [ts.SyntaxKind.ImportDeclaration],
  [NodeTypeMap.Identifier]: [ts.SyntaxKind.Identifier],
  [NodeTypeMap.TypeDefitionen]: [
    ts.SyntaxKind.TypeAliasDeclaration,
    ts.SyntaxKind.ImportClause,
    ts.SyntaxKind.NamespaceImport,
    ts.SyntaxKind.ImportSpecifier,
  ],
} as const

export function nodeMatchType(
  node: ts.Node,
  type: NodeTypeMap | keyof typeof NodeTypeMap,
): boolean {
  // maybe add more than just a kin match!
  if (!NodeTypeToKindMap[type].includes(node.kind)) {
    return false
  }
  return true
}
