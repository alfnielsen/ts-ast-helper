import * as ts from 'typescript'

export const KeywordTypeMap = {
  AnyKeyword: ts.SyntaxKind.AnyKeyword,
  BigIntKeyword: ts.SyntaxKind.BigIntKeyword,
  BooleanKeyword: ts.SyntaxKind.BooleanKeyword,
  IntrinsicKeyword: ts.SyntaxKind.IntrinsicKeyword,
  NeverKeyword: ts.SyntaxKind.NeverKeyword,
  NumberKeyword: ts.SyntaxKind.NumberKeyword,
  ObjectKeyword: ts.SyntaxKind.ObjectKeyword,
  StringKeyword: ts.SyntaxKind.StringKeyword,
  SymbolKeyword: ts.SyntaxKind.SymbolKeyword,
  UndefinedKeyword: ts.SyntaxKind.UndefinedKeyword,
  UnknownKeyword: ts.SyntaxKind.UnknownKeyword,
  VoidKeyword: ts.SyntaxKind.VoidKeyword,
} satisfies Record<string, ts.KeywordTypeSyntaxKind>
