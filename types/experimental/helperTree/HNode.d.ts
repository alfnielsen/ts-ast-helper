import * as ts from 'typescript';
import { HParameter } from './HParameter';
export declare class HNode {
    comments: string;
    text: string;
    tsKind?: ts.SyntaxKind;
    tsKindText?: string;
    name?: string;
    /** Full start include comments */
    commentsStart: number;
    /** start for code */
    start: number;
    end: number;
    children: HNode[];
    parent?: HNode;
    tsNode?: ts.Node;
    depth: number;
    modifier: string[];
    parameters: HParameter[];
    returnType?: string;
    isExported: boolean;
    constructor();
    static new(data: Partial<{
        [Property in keyof HNode]: HNode[Property];
    }>): HNode;
    static fromTsNode(node: ts.Node, parent?: HNode | ts.Node, depth?: number): HNode;
    getJsonData(): {
        text: string;
        comments: string;
        commentsStart: number;
        name: string;
        start: number;
        end: number;
        kind: string;
        modifier: string[];
        parameters: {
            dotDotDotToken: boolean;
            name: string;
            questionToken: boolean;
            start: number;
            end: number;
            tsKind: string;
            modifiers: any[];
        }[];
        returnType: string;
        isExported: boolean;
    };
    getJsonString(): string;
}
