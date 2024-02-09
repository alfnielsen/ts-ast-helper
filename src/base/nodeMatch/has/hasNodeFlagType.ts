import * as ts from 'typescript'

export const hasNodeFlagType = (
  node: ts.Node,
  nodeFalg: ts.NodeFlags | keyof typeof ts.NodeFlags,
) => {
  return (
    (ts.getCombinedNodeFlags(node) &
      (ts.NodeFlags[nodeFalg] as ts.NodeFlags)) !==
    0
  )
}
