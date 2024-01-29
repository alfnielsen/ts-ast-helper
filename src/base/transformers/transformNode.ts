import * as ts from 'typescript'

// Run the transformer on the node
export function transformNode<TNode extends ts.Node = ts.Node>(
  node: TNode,
  ...transformer: ts.TransformerFactory<TNode>[]
) {
  const result = ts.transform(node, transformer)
  const transformedSourceFile = result.transformed[0] as TNode
  return transformedSourceFile
}
