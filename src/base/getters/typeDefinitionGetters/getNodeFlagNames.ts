import * as ts from 'typescript'

export function getNodeFlagNames(flag: ts.NodeFlags): string[] {
  const flagStrings = Object.entries(ts.NodeFlags)
    .filter(([key, val]) => (flag & (val as ts.NodeFlags)) !== 0)
    .map(([key, val]) => key)
  return flagStrings
}
