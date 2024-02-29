import * as ts from 'typescript';
export declare enum NodeTypeMap {
    Function = "Function",
    ArrowFunction = "ArrowFunction",
    Variable = "Variable",
    Block = "Block",
    Import = "Import",
    Identifier = "Identifier",
    TypeDefitionen = "TypeDefitionen"
}
export declare const NodeTypeToKindMap: Record<keyof typeof NodeTypeMap, ts.SyntaxKind[]>;
export declare function nodeMatchType(node: ts.Node, type: NodeTypeMap | keyof typeof NodeTypeMap): boolean;
