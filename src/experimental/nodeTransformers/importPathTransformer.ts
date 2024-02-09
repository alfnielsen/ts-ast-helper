import * as ts from 'typescript'
import { findImportsInCode } from 'src/base/nodeFinders/inCode/findManyInCode/findImportsInCode'
import { replaceAt } from 'src/util/replaceAt'

/**
 * Change the import path of the import declaration,
 * in a code string.
 * @param code
 * @param predicate
 * @returns
 */
export function importPathTransformer(
  code: string,
  predicate: (importPath: string, importNode: ts.ImportDeclaration) => string,
) {
  const imports = findImportsInCode(code)
  imports
    // replace from bottom up, to ensure correct start and end from original imports
    .reverse()
    .forEach((importNode) => {
      const importPath = importNode.moduleSpecifier.getText()
      const newImportPath = predicate(importPath, importNode)
      code = replaceAt(
        code,
        newImportPath,
        importNode.moduleSpecifier.getStart(),
        importNode.moduleSpecifier.getEnd(),
      )
    })

  return code
}
