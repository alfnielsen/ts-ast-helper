import * as ts from 'typescript';
import { type LogColor } from 'src/util/LogUtil';
import { HNode } from 'src/experimental/helperTree/HNode';
export declare type HTreeVisitOptions = {
    node?: HNode;
    depth?: number | 'all';
    visitor: (node: HNode, opt: HTreeVisitVisitorRunOptions) => undefined | void | true;
};
export declare type HTreeVisitVisitorOptions = {
    depth?: number | 'all';
};
export declare type HTreeVisitVisitorRunOptions = {
    siblingIndex: number;
    siblingCount: number;
    depth: number;
    maxDepth: number;
    stopped: boolean;
};
export declare type HTreePrintTreeLogger = (content: string, node?: HNode) => void;
export declare type HTreePrintTreeOptions = {
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
    rootNode: any;
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
        node: any;
    };
    getJsonString(excludeNodes?: boolean): string;
}
export declare const Tree: (code?: string) => HTree;
export default HTree;
