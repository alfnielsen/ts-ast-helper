import * as ts from 'typescript';
import type { FindNodeOptions } from './../../findNodes';
export declare function findIdentifiers(rootNode: ts.Node, opt?: FindNodeOptions): ts.Identifier[];
