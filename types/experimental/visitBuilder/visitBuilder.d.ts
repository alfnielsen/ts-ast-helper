import * as ts from 'typescript';
export declare class VisitBuilder {
    private currentNode;
    private nodeMatchList;
    private tsProgram?;
    constructor(key?: string);
    program(program: ts.Program): this;
    filePath(filePath: string): this;
    code(code: string): this;
    sourceFile(sourcFile: ts.SourceFile): this;
    setKey(key: string): this;
    thenFind(key: string): this;
    name(...name: (string | string[] | RegExp)[]): this;
    kind(...kind: (ts.SyntaxKind | keyof typeof ts.SyntaxKind)[]): this;
    type(type: (VisitBuilderNodeMatchType | keyof typeof VisitBuilderNodeMatchType)[]): this;
    must(macther: NodeMatchMethod): this;
    not(macther: NodeMatchMethod): this;
    contectMatch(...matcher: (string | RegExp)[]): this;
    afterIndex(index: number): this;
    beforeIndex(index: number): this;
    maxContectLength(length: number): this;
    minContectLength(length: number): this;
    runVisit(): void;
}
export declare const node: (key: string) => VisitBuilder;
export declare class VisitBuilderNodeMatch {
    visitBuilder: VisitBuilder;
    key: string;
    name: (string | string[] | RegExp)[];
    kind: ts.SyntaxKind[];
    type: VisitBuilderNodeMatchType[];
    must: NodeMatchMethod[];
    not: NodeMatchMethod[];
    afterIndex?: number;
    beforeIndex?: number;
    matchNodeContect: (string | RegExp)[];
    maxContentLength?: number;
    minContectLength?: number;
    constructor(visitBuilder: VisitBuilder, key: string);
}
export declare enum VisitBuilderNodeMatchType {
    functionLike = "functionLike",
    function = "function",
    arrowFunction = "arrowFunction",
    variable = "variable"
}
export type NodeMatchMethod = (opt?: NodeMatchMethodArguments) => boolean;
export type NodeMatchMethodArguments = {
    node: ts.Node;
    sourceFile: ts.SourceFile;
    program: ts.Program;
    parent?: ts.Node;
    ancestors?: ts.Node[];
    capture?: boolean;
};
