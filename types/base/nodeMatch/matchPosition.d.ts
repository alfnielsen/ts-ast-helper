import * as ts from 'typescript';
export declare function nodeStartBeforePosition(node: ts.Node, index: number): boolean;
export declare function nodeFullStartBeforePosition(node: ts.Node, index: number): boolean;
export declare function nodeStartAfterPosition(node: ts.Node, index: number): boolean;
export declare function nodeFullStartAfterPosition(node: ts.Node, index: number): boolean;
export declare function endBeforePosition(node: ts.Node, index: number): boolean;
export declare function endAfterPosition(node: ts.Node, index: number): boolean;
