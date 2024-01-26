import * as ts from 'typescript'
import { nodeMatchContent } from 'src/base/nodeMatch/nodeMatchContent'
import { nodeMatchKind } from 'src/base/nodeMatch/nodeMatchKind'
import { nodeMatchName } from 'src/base/nodeMatch/nodeMatchName'
import { nodeMatchOneOfKinds } from 'src/base/nodeMatch/nodeMatchOneOfKinds'
import { nodeMatchOneOfNames } from 'src/base/nodeMatch/nodeMatchOneOfNames'
import { nodeMatchOneOfTypes } from 'src/base/nodeMatch/nodeMatchOneOfTypes'
import {
  nodeMatchType,
  type NodeTypeMap,
} from 'src/base/nodeMatch/nodeMatchType'
import { nodeNameContains } from 'src/base/nodeMatch/nodeNameContains'
import { hasAllModifiers } from 'src/base/nodeProperties/hasAllModifiers'
import { hasModifier } from 'src/base/nodeProperties/hasModifiers'

export type NodeMatchOptions = {
  // node matcher
  kind?: ts.SyntaxKind | keyof typeof ts.SyntaxKind
  oneOfKinds?: (ts.SyntaxKind | keyof typeof ts.SyntaxKind)[]
  nameContains?: string | RegExp
  type?: NodeTypeMap | keyof typeof NodeTypeMap
  oneOfTypes?: (NodeTypeMap | keyof typeof NodeTypeMap)[]
  matchContent?: string | RegExp
  contentContains?: string | RegExp
  contentContainsAll?: (string | RegExp)[]
  // special
  name?: string | RegExp
  oneOfNames?: (string | RegExp)[]
  export?: true
  async?: true
  modifiers?: ts.ModifierSyntaxKind[]
  // custome matcher
  match?: (node: ts.Node) => boolean
  // relation matchers
  // matchAncestor: NodeMatchOptionsFunction
  // matchSibling: NodeMatchOptionsFunction
  // matchChildren: NodeMatchOptionsFunction
  // matchGranChildren: NodeMatchOptionsFunction
}

const matchFunctionMap: Partial<
  Record<keyof NodeMatchOptions, (node: ts.Node, ...input: any[]) => boolean>
> = {
  name: nodeMatchName,
  oneOfNames: nodeMatchOneOfNames,
  nameContains: nodeNameContains,
  kind: nodeMatchKind,
  oneOfKinds: nodeMatchOneOfKinds,
  type: nodeMatchType,
  oneOfTypes: nodeMatchOneOfTypes,
  matchContent: nodeMatchContent,
  contentContains: nodeMatchContent,
  modifiers: hasAllModifiers,
} as const

export type FindNodeOptionsFunction = (
  node: ts.Node,
  options: NodeMatchOptions,
) => boolean

export function nodeMatchOptions(
  node: ts.Node,
  opt: NodeMatchOptions,
): boolean {
  for (let [prop, func] of Object.entries(matchFunctionMap)) {
    const propName = prop as keyof typeof matchFunctionMap
    if (opt[propName]) {
      if (
        Array.isArray(opt[propName]) &&
        //@ts-ignore
        !func(node, ...opt[propName])
      ) {
        return false
      } else if (!func(node, ...opt[propName])) {
        return false
      }
    }
  }
  if (opt.export && !hasModifier(node, ts.SyntaxKind.ExportKeyword)) {
    return false
  }
  if (opt.async && !hasModifier(node, ts.SyntaxKind.AsyncKeyword)) {
    return false
  }
  if (opt.match && !opt.match(node)) {
    return false
  }
  return true
}
