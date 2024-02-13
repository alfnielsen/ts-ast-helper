import * as ts from 'typescript';
import { type FindNodeTypeOptions } from './../../findOne/findNodeType';
export declare function findImportsInCode(code: string, opt?: FindNodeTypeOptions): ts.ImportDeclaration[];
