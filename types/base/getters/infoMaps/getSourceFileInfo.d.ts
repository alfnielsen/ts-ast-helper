import * as ts from 'typescript';
import { type ImportInfo } from './getImportInfo';
import { type StatementInfo } from './getStatementInfo';
import { type FunctionInfo } from './getFunctionInfo';
import { type VariableStatementInfo } from './getVariableStatementInfo';
import { type NodeInfo } from './getNodeInfo';
export type SourceFileInfo = NodeInfo & {
    text: string;
    deps: {
        name?: string;
        path: string;
    }[];
    fileName: string;
    hasNoDefaultLib: boolean;
    isDeclarationFile: boolean;
    moduleName?: string;
    referencedFiles: {
        fileName: string;
        pos: number;
        end: number;
        resolutionMode: string;
    }[];
    typeReferenceDirectives: {
        fileName: string;
        pos: number;
        end: number;
        resolutionMode: string;
    }[];
    statements: StatementInfo[];
    imports: ImportInfo[];
    functions: FunctionInfo[];
    variables: VariableStatementInfo[];
};
export declare function getSourceFileInfo(node: ts.SourceFile): {
    deps: {
        name: string;
        path: string;
    }[];
    fileName: string;
    hasNoDefaultLib: boolean;
    isDeclarationFile: boolean;
    moduleName: string;
    referencedFiles: {
        fileName: string;
        pos: number;
        end: number;
        resolutionMode: string;
    }[];
    typeReferenceDirectives: {
        fileName: string;
        pos: number;
        end: number;
        resolutionMode: string;
    }[];
    statements: {
        text: string;
        start: number;
        end: number;
        kind: string;
        kindValue: number;
        flags: string[];
        flagValue: ts.NodeFlags;
    }[];
    imports: {
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
    }[];
    functions: {
        name: string;
        body: string;
        modifiers: string[];
        parameterNames: string[];
        parameters: string[];
        nameInfo: {
            name: string;
            text: string;
            start: number;
            end: number;
            kind: string;
            kindValue: number;
            flags: string[];
            flagValue: ts.NodeFlags;
        };
        bodyInfo: {
            statements: {
                text: string;
                start: number;
                end: number;
                kind: string;
                kindValue: number;
                flags: string[];
                flagValue: ts.NodeFlags;
            }[];
            text: string;
            start: number;
            end: number;
            kind: string;
            kindValue: number;
            flags: string[];
            flagValue: ts.NodeFlags;
        };
        modifierInfos: {
            text: string;
            start: number;
            end: number;
            kind: string;
            kindValue: number;
            flags: string[];
            flagValue: ts.NodeFlags;
        }[];
        statementInfos: {
            text: string;
            start: number;
            end: number;
            kind: string;
            kindValue: number;
            flags: string[];
            flagValue: ts.NodeFlags;
        }[];
        parameterInfos: {
            name: string;
            type: string;
            typeInfo: {
                text: string;
                start: number;
                end: number;
                kind: string;
                kindValue: number;
                flags: string[];
                flagValue: ts.NodeFlags;
            };
            optional: boolean;
            spread: boolean;
            modifiers: string[];
            text: string;
            start: number;
            end: number;
            kind: string;
            kindValue: number;
            flags: string[];
            flagValue: ts.NodeFlags;
        }[];
        text: string;
        start: number;
        end: number;
        kind: string;
        kindValue: number;
        flags: string[];
        flagValue: ts.NodeFlags;
    }[];
    variables: {
        text: string;
        start: number;
        end: number;
        kind: string;
        declarationList: {
            text: string;
            start: number;
            end: number;
            kind: string;
            flags: string[];
            var: boolean;
            let: boolean;
            const: boolean;
            declarationType: "const" | "let" | "var";
            declarations: {
                text: string;
                name: string;
                start: number;
                end: number;
                kind: string;
                exclamationMark: boolean;
                type: {
                    text: string;
                    start: number;
                    end: number;
                    kind: string;
                    kindValue: number;
                    flags: string[];
                    flagValue: ts.NodeFlags;
                };
                async: boolean;
                await: boolean;
                flags: string[];
                value: {
                    text: string;
                    start: number;
                    end: number;
                    kind: string;
                    kindValue: number;
                    flags: string[];
                    flagValue: ts.NodeFlags;
                };
            }[];
        };
        flags: string[];
        export: boolean;
        defaultExport: boolean;
    }[];
    text: string;
    start: number;
    end: number;
    kind: string;
    kindValue: number;
    flags: string[];
    flagValue: ts.NodeFlags;
};
