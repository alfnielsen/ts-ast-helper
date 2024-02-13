import * as ts from 'typescript';
import { type FindNodeTypeOptions } from './../findOne/findNodeType';
export declare function findImports(rootNode: ts.Node, opt?: FindNodeTypeOptions): ts.ImportDeclaration[];
