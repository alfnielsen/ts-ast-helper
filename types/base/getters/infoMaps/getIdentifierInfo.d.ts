import * as ts from 'typescript';
import { type NodeInfo } from './getNodeInfo';
export type IdentifierInfo = NodeInfo & {
    name: string;
};
export declare function getIdentifierInfo(node: ts.Identifier): {
    name: string;
    text: string;
    start: number;
    end: number;
    kind: string;
    kindValue: number;
    flags: string[];
    flagValue: ts.NodeFlags;
};
