import * as ts from 'typescript'
import {
  tranformWithState,
  type TranformVisitorWithStateOptions,
} from './tranformWithState'

export function tranformSourceFileWithState<
  TState extends object = {},
  TGlobalState extends object = {},
>(
  options: TranformVisitorWithStateOptions<ts.SourceFile, TState, TGlobalState>,
) {
  return tranformWithState({
    ...options,
    sourceVisitor(node, { context, visitChildern }) {
      // Start a new lexical environment when beginning to process the source file.
      context.startLexicalEnvironment()

      // visit each node in the file.
      const updatedNode = visitChildern() as ts.SourceFile

      // End the lexical environment and collect any declarations (function declarations, variable declarations, etc) that were added.
      const declarations = context.endLexicalEnvironment() ?? []
      const statements = [...declarations, ...updatedNode.statements]

      return ts.factory.updateSourceFile(
        node,
        statements,
        node.isDeclarationFile,
        node.referencedFiles,
        node.typeReferenceDirectives,
        node.hasNoDefaultLib,
        node.libReferenceDirectives,
      )
    },
  })
}
