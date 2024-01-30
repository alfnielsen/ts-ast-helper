import * as ts from 'typescript'
import { type TranformVisitorWithStateOptions } from './tranformWithState'
import { tranformSourceFileWithState } from 'src/base/transformers/tranformSourceFileWithState'
import { tranformBlockWithState } from 'src/base/transformers/tranformBlockWithState'
import { printNode } from 'src/base/printer/printNode'

export function tranformBlockOrSourceFileWithState<
  TTBlock extends ts.SourceFile | ts.Block,
  TState extends object = {},
  TGlobalState extends object = {},
>(options: TranformVisitorWithStateOptions<TTBlock, TState, TGlobalState>) {
  if (ts.isSourceFile(options.node)) {
    const sourceFileOptions =
      options as unknown as TranformVisitorWithStateOptions<
        ts.SourceFile,
        TState,
        TGlobalState
      >
    return tranformSourceFileWithState(sourceFileOptions)
  }
  if (ts.isBlock(options.node)) {
    const sourceFileOptions =
      options as unknown as TranformVisitorWithStateOptions<
        ts.Block,
        TState,
        TGlobalState
      >
    return tranformBlockWithState(sourceFileOptions)
  }
  console.log('scope:\n', printNode(options.node))
  throw new Error('Node is not a valid scope (SourceFile, Block)')
}
