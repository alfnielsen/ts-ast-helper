import * as ts from 'typescript';
export type TypeDefsVisitorFromString = {
    content: string;
    type: string | ts.Node;
    predicate: (type: ts.Node) => void;
    includeNoneNamed?: boolean;
    includeEnums?: boolean;
};
export declare function typeDefenitionDependencyWalker(opt: TypeDefsVisitorFromString): void;
