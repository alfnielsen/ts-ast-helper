import * as ts from 'typescript';
import { type TranformVisitorWithStateOptions } from './tranformWithState';
export declare function tranformBlockWithState<TState extends object = {}, TGlobalState extends object = {}>(options: TranformVisitorWithStateOptions<ts.Block, TState, TGlobalState>): ts.Block;
