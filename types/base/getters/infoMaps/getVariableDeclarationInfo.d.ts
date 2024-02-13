import * as ts from 'typescript';
import { type StatementInfo } from './getStatementInfo';
import { type TypeInfo } from './getTypeInfo';
export type VariableDeclarationInfo = {
    text: string;
    name: string;
    start: number;
    end: number;
    kind: string;
    flags: string[];
    exclamationMark: boolean;
    type?: TypeInfo;
    value?: StatementInfo;
    async: boolean;
    await: boolean;
};
export declare function getVariableDeclarationInfo(node: ts.VariableDeclaration): {
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
