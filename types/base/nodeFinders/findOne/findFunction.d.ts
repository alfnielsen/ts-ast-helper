import * as ts from 'typescript';
import { type FindNodeTypeOptions } from './findNodeType';
export declare function findFunction(rootNode: ts.Node, opt?: FindNodeTypeOptions): ts.FunctionDeclaration;
