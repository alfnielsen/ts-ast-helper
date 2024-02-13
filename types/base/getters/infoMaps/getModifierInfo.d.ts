import { type NodeInfo } from './getNodeInfo';
import * as ts from 'typescript';
export type ModifierInfo = NodeInfo & {};
export declare function getModifierInfo(node: ts.ModifierLike): {
    text: string;
    start: number;
    end: number;
    kind: string;
    kindValue: number;
    flags: string[];
    flagValue: ts.NodeFlags;
};
