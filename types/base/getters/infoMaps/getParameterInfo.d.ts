import { type NodeInfo } from './getNodeInfo';
import * as ts from 'typescript';
export type ParameterInfo = NodeInfo & {
    name: string;
    type: string;
    optional: boolean;
    spread: boolean;
    modifiers: string[];
    typeInfo?: NodeInfo | undefined;
};
/**
 * Under construction! (Simly name info for now)
 * @param node
 * @returns
 */
export declare function getParameterInfo(node: ts.ParameterDeclaration): {
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
};
