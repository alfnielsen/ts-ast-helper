import * as ts from 'typescript'
import { nodeMatchType, type NodeTypeMap } from './baseNodeMatch/nodeMatchType'
import { nodeMatchName } from './baseNodeMatch/nodeMatchName'
import { nodeNameIncludes } from './baseNodeMatch/nodeNameIncludes'
import { nodeMatchOneOfNames } from './baseNodeMatch/nodeMatchOneOfNames'
import { nodeMatchKind } from './baseNodeMatch/nodeMatchKind'
import { nodeMatchOneOfKinds } from './baseNodeMatch/nodeMatchOneOfKinds'

export type NodeMatchOptions = {
  // node matcher
  name?: string | RegExp
  oneOfNames?: (string | RegExp)[]
  nameIncludes?: string
  kind?: ts.SyntaxKind | keyof typeof ts.SyntaxKind
  oneOfKinds?: (ts.SyntaxKind | keyof typeof ts.SyntaxKind)[]
  type?: NodeTypeMap | keyof typeof NodeTypeMap
  oneOfTypes?: (NodeTypeMap | keyof typeof NodeTypeMap)[]
  matchContent: string | RegExp
  contentContains: string | RegExp
  contentContainsAll: (string | RegExp)[]
  // custome matcher
  match: (node: ts.Node) => boolean
  dontMatch: (node: ts.Node) => boolean
  // relation matchers
  matchAncestor: NodeMatchOptionsFunction
  matchSibling: NodeMatchOptionsFunction
  matchChildren: NodeMatchOptionsFunction
  matchGranChildren: NodeMatchOptionsFunction
}

export type NodeMatchOptionsFunction = (
  node: ts.Node,
  options: NodeMatchOptions,
) => boolean

export function nodeMatchOptions(
  node: ts.Node,
  options: NodeMatchOptions,
): boolean {
  if (options.name && !nodeMatchName(node, options.name)) {
    return false
  }
  if (options.oneOfNames && !nodeMatchOneOfNames(node, ...options.oneOfNames)) {
    return false
  }
  if (options.nameIncludes && !nodeNameIncludes(node, options.nameIncludes)) {
    return false
  }
  if (options.kind && !nodeMatchKind(node, options.kind)) {
    return false
  }
  if (options.oneOfKinds && !nodeMatchOneOfKinds(node, ...options.oneOfKinds)) {
    return false
  }
  if (options.type && !nodeMatchType(node, options.type)) {
    return false
  }
  if (options.type && !nodeMatchType(node, options.type)) {
    return false
  }

  return true
}
