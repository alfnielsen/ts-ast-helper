import * as ts from 'typescript';
import type { FindNodeOptions } from './findNodes';
export declare function findNodesInCode<TType extends ts.Node = ts.Node>(code: string, opt?: FindNodeOptions): TType[];
