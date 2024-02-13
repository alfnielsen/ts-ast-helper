import * as ts from 'typescript';
import { type NodeInfo } from './getNodeInfo';
import { type StatementInfo } from './getStatementInfo';
export type BlockInfo = NodeInfo & {
    statements: StatementInfo[];
};
export declare function getBlockInfo(node: ts.Block): {
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
