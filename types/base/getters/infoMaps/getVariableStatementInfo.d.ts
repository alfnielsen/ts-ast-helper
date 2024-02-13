import * as ts from 'typescript';
import { type VariableDeclarationListInfo } from './getVariableDeclarationListInfo';
export type VariableStatementInfo = {
    text: string;
    start: number;
    end: number;
    kind: string;
    declarationList: VariableDeclarationListInfo;
    flags: string[];
    export: boolean;
    defaultExport: boolean;
};
export declare function getVariableStatementInfo(node: ts.VariableStatement): {
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
};
