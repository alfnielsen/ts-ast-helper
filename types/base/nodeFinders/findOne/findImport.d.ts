import * as ts from 'typescript';
import { type FindNodeTypeOptions } from './findNodeType';
export declare function findImport(rootNode: ts.Node, opt?: FindNodeTypeOptions): ts.ImportDeclaration;
