import * as ts from 'typescript';
import { type NodeInfo } from './getNodeInfo';
export type TypeInfo = NodeInfo & {};
export declare function getTypeInfo(node: ts.TypeNode): {
    text: string;
    start: number;
    end: number;
    kind: string;
    kindValue: number;
    flags: string[];
    flagValue: ts.NodeFlags;
};
