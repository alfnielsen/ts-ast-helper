import * as ts from 'typescript';
import { type FindNodeTypeOptions } from 'src/base/nodeFinders/specifiedTypes/findOne/findNodeType';
export declare type FindFunctionOptions = FindNodeTypeOptions & {
    includeVariableFunction?: boolean; /** defatult: true */
};
/**
 * Find any function under the rootNode. \
 * (This dont match arrow-function unless it's it hold by a variable) \

 * This will find FunctionDeclaration 'function Foo(){}' \
 * and variables that holds a function or arrow-function (as a FunctionDeclaration).
 *
 * @example
 *   function Foo(){}
 *    const foo = ()=>{}
 * @param rootNode
 * @param opt
 */
export declare function findFunctions(rootNode: ts.Node, opt?: FindFunctionOptions): any;
