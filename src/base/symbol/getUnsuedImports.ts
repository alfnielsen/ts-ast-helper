import * as ts from 'typescript'
import { getProgramChecker } from 'src/base/symbol/getProgramChecker'
import { findImports } from 'src/base/nodeFinders/findMany/findImports'
import { nodeMatchAncestor } from 'src/base/nodeMatch/match/nodeMatchAncestor'
import { findAncestor } from 'src/base/nodeFinders/findAncestor'
import { findIdentifiers } from 'src/base/nodeFinders/findMany/findIdentifiers'

export function getUnsuedImports(sourceFile: ts.SourceFile) {
  const { checker } = getProgramChecker(sourceFile)
  const importDeclarations = findImports(sourceFile)
  const identifiers = findIdentifiers(sourceFile, {
    match(node) {
      // only identifiers that are not part of an import declaration
      const isImport = nodeMatchAncestor(node, { kind: 'ImportDeclaration' })
      if (isImport) {
        return false
      }
      return true
    },
  })

  for (const identifier of identifiers) {
    const symbol = checker.getSymbolAtLocation(identifier)
    if (!symbol) {
      continue
    }
    const declarations = symbol.getDeclarations()
    if (!declarations) {
      continue
    }
    for (const declaration of declarations) {
      const importDecl = findAncestor<ts.ImportDeclaration>(declaration, {
        kind: 'ImportDeclaration',
      })
      if (!importDecl) {
        continue
      }
      // remove from importDeclarations if a reference is found
      const index = importDeclarations.indexOf(importDecl)
      if (index !== -1) {
        importDeclarations.splice(index, 1)
      }
    }
  }
  return importDeclarations
}
