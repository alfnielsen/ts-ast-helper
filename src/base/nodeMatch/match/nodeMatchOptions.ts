import * as ts from 'typescript'
import { nodeMatchContent } from 'src/base/nodeMatch/match/nodeMatchContent'
import { nodeMatchKind } from 'src/base/nodeMatch/match/nodeMatchKind'
import { nodeMatchName } from 'src/base/nodeMatch/match/nodeMatchName'
import { nodeMatchOneOfKinds } from 'src/base/nodeMatch/match/nodeMatchOneOfKinds'
import { nodeMatchOneOfNames } from 'src/base/nodeMatch/match/nodeMatchOneOfNames'
import { nodeMatchOneOfTypes } from 'src/base/nodeMatch/match/nodeMatchOneOfTypes'
import {
  nodeMatchType,
  type NodeTypeMap,
} from 'src/base/nodeMatch/match/nodeMatchType'
import { nodeNameContains } from 'src/base/nodeMatch/match/nodeNameContains'
import { hasModifiers } from 'src/base/nodeMatch/hasAll/hasModifiers'
import { hasModifier } from 'src/base/nodeMatch/has/hasModifier'
import { hasOneOfModifiers } from 'src/base/nodeMatch/hasOneOf/hasOneOfModifiers'
import { hasModifierLike } from 'src/base/nodeMatch/has/hasModifierLike'
import { isExported } from 'src/base'

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
  modifier?: ts.ModifierSyntaxKind
  modifiers?: ts.ModifierSyntaxKind[]
  oneOfModifiers?: ts.ModifierSyntaxKind[]
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
  modifier: hasModifier,
  modifiers: hasModifiers,
  oneOfModifiers: hasOneOfModifiers,
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
      } else if (!func(node, opt[propName])) {
        return false
      }
    }
  }
  if (opt.export && !hasModifierLike(node, ts.SyntaxKind.ExportKeyword)) {
    return false
  }
  if (opt.async && !hasModifierLike(node, ts.SyntaxKind.AsyncKeyword)) {
    return false
  }
  if (opt.match && !opt.match(node)) {
    return false
  }
  return true
}
