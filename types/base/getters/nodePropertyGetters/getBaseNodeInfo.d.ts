import * as ts from 'typescript';
export declare const getBaseNodeInfo: (node: ts.Node) => {
    text: string;
    fullText: string;
    name: string;
    start: number;
    fullStart: number;
    end: number;
    kind: string;
    modifier: string;
    parameters: string;
    sourceFileName: string;
    sourceFileText: string;
};
