import * as ts from 'typescript';
/**
 * Change the import path of the import declaration,
 * in a code string.
 * @param code
 * @param predicate
 * @returns
 */
export declare function importPathTransformer(code: string, predicate: (importPath: string, importNode: ts.ImportDeclaration) => string): string;
