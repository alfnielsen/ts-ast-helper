import * as ts from 'typescript'
import { findNodesInCode, getName } from 'src/base'
import { getAllTypeDefsFromString } from 'src/experimental/typeDefsVisitor/getAllTypeDefsFromString'

export type TypeDefsVisitorFromString = {
  content: string
  type: string | ts.Node
  predicate: (type: ts.Node) => void
}

// function typeDefsVisitorFromString(opt: TypeDefsVisitorFromString) {
//   const { content, predicate, type } = opt
//   // collect all type definations:
//   const typeDeclarations = getAllTypeDefsFromString({ content })
//   // find type
//   let typeName = typeof type === 'string' ? type : getName(type)
//   let typeNode = typeDeclarations.find((t) => getName(t) === typeName)
//   walk()
// }

// function walk(opt: TypeDefsVisitorFromString): boolean {
//   const { content, predicate, type } = opt

//   if (ts.isArrayTypeNode(type)) {
//     return walk(content, type.elementType, nonLegalTypes)
//   }

//   if (ts.isUnionTypeNode(type)) {
//     return type.types.every((unionType) =>
//       walk(content, unionType, nonLegalTypes),
//     )
//   }

//   if (ts.isTypeReferenceNode(type)) {
//     const refTypeName = type.typeName.getText()
//     if (refTypeName === 'Record') {
//       if (!type.typeArguments) {
//         nonLegalTypes.push(refTypeName)
//         return false
//       }
//       if (type.typeArguments.length !== 2) {
//         nonLegalTypes.push(refTypeName)
//         return false
//       }
//       if (type.typeArguments[0].getText() !== 'string') {
//         nonLegalTypes.push(refTypeName)
//         return false
//       }
//       const genericType = type.typeArguments[1]
//       return walk(content, genericType, nonLegalTypes)
//     }
//     return walk(content, refTypeName, nonLegalTypes)
//   }

//   if (!ts.isTypeLiteralNode(type)) {
//     nonLegalTypes.push(type.getText())
//     return false
//   }
//   return type.members.every((member) => {
//     if (!ts.isPropertySignature(member)) {
//       nonLegalTypes.push(member.getText())
//       return false
//     }
//     const memberType = member.type
//     if (!memberType) {
//       nonLegalTypes.push(member.getText())
//       return false
//     }
//     return walk(content, memberType, nonLegalTypes)
//   })
// }
