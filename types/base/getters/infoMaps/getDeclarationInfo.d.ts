import * as ts from 'typescript';
import { type NodeInfo } from './getNodeInfo';
export type DeclarationInfo = NodeInfo & {};
export declare function getDeclarationInfo(node: ts.Declaration): {
    text: string;
    start: number;
    end: number;
    kind: string;
    kindValue: number;
    flags: string[];
    flagValue: ts.NodeFlags;
};
