import * as ts from 'typescript'

export type NamespaceImportInfo = {
  text: string
  name: string
  start: number
  end: number
  kind: string
}

export function getNamespaceImportInfo(node: ts.NamespaceImport) {
  return {
    text: node.getText() ?? '',
    name: node.name?.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
  } satisfies NamespaceImportInfo
}

export type ImportSpecifierInfo = {
  text: string
  name: string
  start: number
  end: number
  kind: string
  isTypeOnly: boolean
  propertyName: string
}

export function getImportSpecifierInfo(node: ts.ImportSpecifier) {
  return {
    text: node.getText() ?? '',
    name: node.name?.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
    isTypeOnly: node.isTypeOnly,
    propertyName: node.propertyName?.getText() ?? '',
  } satisfies ImportSpecifierInfo
}

export type NamedImportsInfo = {
  text: string
  start: number
  end: number
  kind: string
  imports: ImportSpecifierInfo[]
}

export function getNamedImportsInfo(node: ts.NamedImports) {
  return {
    text: node.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
    imports: node.elements.map(getImportSpecifierInfo),
  } satisfies NamedImportsInfo
}

export type ImportInfo = {
  text: string
  start: number
  end: number
  kind: string
  importPath: string
  defaultImportName: string
  defaultImportIsTypeOnly: boolean
  namespaceImport?: NamespaceImportInfo
  namedImports?: NamedImportsInfo
  importNames: string[]
}

/**
 * NOTE: at the moment this only maps imports with a single module specifier
 * fx: import * as ts from => 'typescript' <=
 * @param node
 * @returns
 */
export function getImportInfo(node: ts.ImportDeclaration) {
  const moduleSpecifier = node.moduleSpecifier
  const importClause = node.importClause
  const namedBindings = importClause?.namedBindings
  const importNames: string[] = []

  const importPath =
    moduleSpecifier?.getText().replace(/^['"]|['"]$/g, '') ?? ''
  const defaultImportName = node.importClause?.name?.getText() ?? ''
  const defaultImportIsTypeOnly = importClause?.isTypeOnly ?? false
  const namespaceImport =
    !namedBindings || !ts.isNamespaceImport(namedBindings)
      ? undefined
      : getNamespaceImportInfo(namedBindings)
  const namedImports =
    !namedBindings || !ts.isNamedImports(namedBindings)
      ? undefined
      : getNamedImportsInfo(namedBindings)

  if (namespaceImport) {
    importNames.push(namespaceImport.name)
  }
  if (defaultImportName) {
    importNames.push(defaultImportName)
  }
  if (namedImports) {
    importNames.push(...namedImports.imports.map((imp) => imp.name))
  }

  return {
    text: node.getText() ?? '',
    start: node.getStart(),
    end: node.getEnd(),
    kind: ts.SyntaxKind[node.kind],
    importPath,
    defaultImportName,
    defaultImportIsTypeOnly,
    namespaceImport,
    namedImports,
    importNames,
  } satisfies ImportInfo
}
