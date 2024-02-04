import type { TranformVisitorWithStateOptions } from 'src/base/transformers/tranformWithState';
import * as ts from 'typescript';
/**
 *  UNDER DEVELOPMENT
 * @param options
 * @returns
 */
export declare function tranformVisitor<TNode extends ts.Node = ts.Node, TState extends object = {}, TGlobalState extends object = {}>(options: TranformVisitorWithStateOptions<TNode, TState, TGlobalState>): TNode;
