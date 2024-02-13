import * as ts from 'typescript';
export type NodeInfo = {
    text: string;
    start: number;
    end: number;
    kind: string;
    kindValue: number;
    flags?: string[];
    flagValue?: number;
};
export declare function getNodeInfo(node: ts.Node): {
    text: string;
    start: number;
    end: number;
    kind: string;
    kindValue: number;
    flags: string[];
    flagValue: ts.NodeFlags;
};
