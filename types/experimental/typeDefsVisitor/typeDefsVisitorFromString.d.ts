import * as ts from 'typescript';
export type TypeDefsVisitorFromString = {
    content: string;
    type: string | ts.Node;
    predicate: (type: ts.Node) => void;
};
