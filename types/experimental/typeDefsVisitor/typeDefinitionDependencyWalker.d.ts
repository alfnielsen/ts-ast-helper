import * as ts from 'typescript';
export type TypeDefinitionDependencyWalker = {
    content: string;
    type: string | ts.Node;
    predicate: (type: ts.Node) => void;
    includeNoneNamed?: boolean;
    includeEnums?: boolean;
};
export declare const nativeTypes: string[];
export declare function typeDefinitionDependencyWalker(opt: TypeDefinitionDependencyWalker): void;
