import * as ts from 'typescript';
import { type TranformVisitorWithStateOptions } from './tranformWithState';
export declare function tranformBlockOrSourceFileWithState<TTBlock extends ts.SourceFile | ts.Block, TState extends object = {}, TGlobalState extends object = {}>(options: TranformVisitorWithStateOptions<TTBlock, TState, TGlobalState>): any;
