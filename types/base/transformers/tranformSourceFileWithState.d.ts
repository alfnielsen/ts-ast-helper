import * as ts from 'typescript';
import { type TranformVisitorWithStateOptions } from './tranformWithState';
export declare function tranformSourceFileWithState<TState extends object = {}, TGlobalState extends object = {}>(options: TranformVisitorWithStateOptions<ts.SourceFile, TState, TGlobalState>): ts.SourceFile;
