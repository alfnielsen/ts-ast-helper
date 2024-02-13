import * as ts from 'typescript';
import type { FindNodeOptions } from './../../findNodes';
export declare function findIdentifiersInCode(code: string, opt?: FindNodeOptions): ts.Identifier[];
