import * as ts from 'typescript';
import { type NodeInfo } from './getNodeInfo';
export type StatementInfo = NodeInfo & {};
export declare function getStatementInfo(node: ts.Statement): {
    text: string;
    start: number;
    end: number;
    kind: string;
    kindValue: number;
    flags: string[];
    flagValue: ts.NodeFlags;
};
