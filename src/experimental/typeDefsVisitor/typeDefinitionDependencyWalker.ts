import * as ts from 'typescript'
import { getName, nodeMatchType } from 'src/base'
import { getAllTypeDefsFromString } from 'src/experimental/typeDefsVisitor/getAllTypeDefsFromString'

export type TypeDefinitionDependencyWalker = {
  content: string
  type: string | ts.Node
  predicate: (type: ts.Node) => void
  includeNoneNamed?: boolean
  includeEnums?: boolean
}

export function typeDefinitionDependencyWalker(
  opt: TypeDefinitionDependencyWalker,
) {
  const {
    content,
    predicate,
    type,
    includeNoneNamed,
    includeEnums = true,
  } = opt
  // collect all type definations:
  const typeDeclarations = getAllTypeDefsFromString({ content })
  // find type
  let typeName = typeof type === 'string' ? type : getName(type)
  let typeNode = typeDeclarations.find((t) => getName(t) === typeName)
  if (!typeNode) {
    throw new Error(`Input TypeNode not found: ${typeName}`)
  }
  const checkedTypes: ts.Node[] = []
  function walk(currentNode: ts.Node) {
    if (checkedTypes.includes(currentNode)) {
      return
    }
    checkedTypes.push(currentNode)

    if (includeNoneNamed || nodeMatchType(currentNode, 'TypeDefitionen')) {
      predicate(currentNode)
    }
    if (includeEnums && ts.isEnumDeclaration(currentNode)) {
      predicate(currentNode)
      return
    }

    if (ts.isArrayTypeNode(currentNode)) {
      walk(currentNode.elementType)
      return
    }

    if (ts.isUnionTypeNode(currentNode)) {
      for (let unionType of currentNode.types) {
        walk(unionType)
      }
      return
    }
    if (ts.isIntersectionTypeNode(currentNode)) {
      for (let intersectionType of currentNode.types) {
        walk(intersectionType)
      }
      return
    }

    if (ts.isTypeReferenceNode(currentNode)) {
      if (!currentNode.typeArguments) {
        const name = getName(currentNode)
        const ref = typeDeclarations.find((r) => getName(r) === name)
        if (!ref) {
          throw new Error(`Type ref '${name}' not found`)
        }
        walk(ref)
        return
      }
      for (let typeArguments of currentNode.typeArguments) {
        walk(typeArguments)
      }
      return
    }

    if (ts.isTypeAliasDeclaration(currentNode)) {
      walk(currentNode.type)
      return
    }

    if (ts.isTypeLiteralNode(currentNode)) {
      for (let member of currentNode.members) {
        if (!ts.isPropertySignature(member)) {
          return
        }
        if (!member.type) {
          return
        }
        walk(member.type)
      }
      return
    }
  }
  // start walking
  walk(typeNode)
}
