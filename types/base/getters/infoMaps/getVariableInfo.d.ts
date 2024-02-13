import type { VariableDeclarationInfo } from './getVariableDeclarationInfo';
import type { VariableDeclarationListInfo } from './getVariableDeclarationListInfo';
import * as ts from 'typescript';
export type VariableInfo = {
    text: string;
    start: number;
    end: number;
    kind: string;
    export: boolean;
    async: boolean;
    await: boolean;
    flags: string[];
    variableDeclarationListInfo: VariableDeclarationListInfo;
    variableDeclarationInfo: VariableDeclarationInfo;
};
/**
 * Take a VariableStatement and return a VariableInfo \
 * Expect a single Variable Declaration \
 * Include modifers, flags ect. from the VariableStatement, VariableDeclarationList, and VariableDeclaration
 * @param node
 * @returns
 */
export declare function getVariableInfo(node: ts.VariableStatement): {
    text: string;
    start: number;
    end: number;
    kind: string;
    export: boolean;
    async: boolean;
    await: boolean;
    flags: string[];
    variableDeclarationListInfo: {
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
    variableDeclarationInfo: {
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
    };
};
