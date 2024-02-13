import { type NodeInfo } from './getNodeInfo';
import * as ts from 'typescript';
export type ExpressionInfo = NodeInfo & {};
export declare function getExpressionInfo(node: ts.Expression | ts.ExpressionStatement): {
    text: string;
    start: number;
    end: number;
    kind: string;
    kindValue: number;
    flags: string[];
    flagValue: ts.NodeFlags;
};
