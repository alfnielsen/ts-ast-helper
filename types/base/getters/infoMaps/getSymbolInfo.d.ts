import * as ts from 'typescript';
import { type DeclarationInfo } from './getDeclarationInfo';
import { type NodeInfo } from './getNodeInfo';
export type SymbolInfo = {
    name: string;
    valueDeclaration?: DeclarationInfo;
    declarations?: DeclarationInfo[];
    members?: Record<string, SymbolInfo>;
    exports?: Record<string, SymbolInfo>;
    globalExports?: Record<string, SymbolInfo>;
    flagNames?: string[];
    flags?: ts.SymbolFlags;
    node?: NodeInfo;
};
export declare function getSymbolInfo(symbol: ts.Symbol, from?: ts.Node): {
    name: string;
    valueDeclaration: {
        text: string;
        start: number;
        end: number;
        kind: string;
        kindValue: number;
        flags: string[];
        flagValue: ts.NodeFlags;
    };
    declarations: {
        text: string;
        start: number;
        end: number;
        kind: string;
        kindValue: number;
        flags: string[];
        flagValue: ts.NodeFlags;
    }[];
    members: Record<string, SymbolInfo>;
    exports: Record<string, SymbolInfo>;
    globalExports: Record<string, SymbolInfo>;
    flags: ts.SymbolFlags;
    flagNames: string[];
    node: {
        text: string;
        start: number;
        end: number;
        kind: string;
        kindValue: number;
        flags: string[];
        flagValue: ts.NodeFlags;
    };
};
