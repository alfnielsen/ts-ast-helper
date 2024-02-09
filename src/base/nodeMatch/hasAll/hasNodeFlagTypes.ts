import { hasNodeFlagType } from 'src/base/nodeMatch/has/hasNodeFlagType'
import * as ts from 'typescript'
export const hasNodeFlagsType = (
  node: ts.Node,
  ...nodeFalgs: (ts.NodeFlags | keyof typeof ts.NodeFlags)[]
) => {
  return nodeFalgs.every((nf) => hasNodeFlagType(node, nf))
}
