import * as ts from 'typescript';
export type VisitorPredicateParamters = {
    parent: ts.Node;
    ancestors: ts.Node[];
    depth: number;
};
export declare function visitor(root: ts.Node, predicate: (node: ts.Node, parameters: VisitorPredicateParamters) => void): void;
