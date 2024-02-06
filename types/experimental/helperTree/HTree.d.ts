import * as ts from 'typescript';
import { type LogColor } from './../../util/LogUtil';
import { HNode } from './HNode';
export type HTreeVisitOptions = {
    node?: HNode;
    depth?: number | 'all';
    visitor: (node: HNode, opt: HTreeVisitVisitorRunOptions) => undefined | void | true;
};
export type HTreeVisitVisitorOptions = {
    depth?: number | 'all';
};
export type HTreeVisitVisitorRunOptions = {
    siblingIndex: number;
    siblingCount: number;
    depth: number;
    maxDepth: number;
    stopped: boolean;
};
export type HTreePrintTreeLogger = (content: string, node?: HNode) => void;
export type HTreePrintTreeOptions = {
    logger?: HTreePrintTreeLogger;
    indent?: number | string;
    indentionPostfix?: string;
    firstIndentionPostfix?: string;
    lastIndentionPostfix?: string;
    textSnippet?: number | boolean;
    includeName?: boolean;
    includeLineCount?: boolean;
    printText?: boolean;
    printInfo?: boolean;
    omitKind?: ts.SyntaxKind | typeof ts.SyntaxKind | (ts.SyntaxKind | typeof ts.SyntaxKind)[];
    markKind?: ts.SyntaxKind | typeof ts.SyntaxKind | (ts.SyntaxKind | typeof ts.SyntaxKind)[];
    deMarkKind?: ts.SyntaxKind | typeof ts.SyntaxKind | (ts.SyntaxKind | typeof ts.SyntaxKind)[];
    printMarkedOnly?: boolean;
    printMarkInfo?: boolean;
    printMarkText?: boolean;
    indentColor?: LogColor;
    nameColor?: LogColor;
    kindColor?: LogColor;
    noteColor?: LogColor;
};
export declare class HTree {
    code: string;
    errorMessage?: string;
    error?: any;
    rootNode: HNode;
    allNode: HNode[];
    namedNodeMap: Record<string, HNode>;
    setCode(code: string | ts.Node, compile?: boolean): this;
    compile(code?: string): this;
    visit(opt: HTreeVisitOptions): void;
    printTree(opt?: HTreePrintTreeOptions): void;
    getJsonData(excludeNodes?: boolean): {
        code: string;
        errorMessage: string;
        error: any;
        node: {
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
    };
    getJsonString(excludeNodes?: boolean): string;
}
export declare const Tree: (code?: string) => HTree;
export default HTree;
