import * as ts from 'typescript';
export type NamespaceImportInfo = {
    text: string;
    name: string;
    start: number;
    end: number;
    kind: string;
};
export declare function getNamespaceImportInfo(node: ts.NamespaceImport): {
    text: string;
    name: string;
    start: number;
    end: number;
    kind: string;
};
export type ImportSpecifierInfo = {
    text: string;
    name: string;
    start: number;
    end: number;
    kind: string;
    isTypeOnly: boolean;
    propertyName: string;
};
export declare function getImportSpecifierInfo(node: ts.ImportSpecifier): {
    text: string;
    name: string;
    start: number;
    end: number;
    kind: string;
    isTypeOnly: boolean;
    propertyName: string;
};
export type NamedImportsInfo = {
    text: string;
    start: number;
    end: number;
    kind: string;
    imports: ImportSpecifierInfo[];
};
export declare function getNamedImportsInfo(node: ts.NamedImports): {
    text: string;
    start: number;
    end: number;
    kind: string;
    imports: {
        text: string;
        name: string;
        start: number;
        end: number;
        kind: string;
        isTypeOnly: boolean;
        propertyName: string;
    }[];
};
export type ImportInfo = {
    text: string;
    start: number;
    end: number;
    kind: string;
    importPath: string;
    defaultImportName: string;
    defaultImportIsTypeOnly: boolean;
    namespaceImport?: NamespaceImportInfo;
    namedImports?: NamedImportsInfo;
    importNames: string[];
};
/**
 * NOTE: at the moment this only maps imports with a single module specifier
 * fx: import * as ts from => 'typescript' <=
 * @param node
 * @returns
 */
export declare function getImportInfo(node: ts.ImportDeclaration): {
    text: string;
    start: number;
    end: number;
    kind: string;
    importPath: string;
    defaultImportName: string;
    defaultImportIsTypeOnly: boolean;
    namespaceImport: {
        text: string;
        name: string;
        start: number;
        end: number;
        kind: string;
    };
    namedImports: {
        text: string;
        start: number;
        end: number;
        kind: string;
        imports: {
            text: string;
            name: string;
            start: number;
            end: number;
            kind: string;
            isTypeOnly: boolean;
            propertyName: string;
        }[];
    };
    importNames: string[];
};
