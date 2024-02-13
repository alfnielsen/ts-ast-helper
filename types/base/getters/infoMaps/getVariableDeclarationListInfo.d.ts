import * as ts from 'typescript';
import { type VariableDeclarationInfo } from './getVariableDeclarationInfo';
export type VariableDeclarationListInfo = {
    text: string;
    start: number;
    end: number;
    kind: string;
    declarations: VariableDeclarationInfo[];
    flags: string[];
    var: boolean;
    let: boolean;
    const: boolean;
    declarationType: 'const' | 'let' | 'var';
};
export declare function getVariableDeclarationListInfo(node: ts.VariableDeclarationList): {
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
