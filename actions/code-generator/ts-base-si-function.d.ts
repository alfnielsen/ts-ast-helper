// isIntersection(): this is IntersectionType;
// isUnionOrIntersection(): this is UnionOrIntersectionType;
// isLiteral(): this is LiteralType;
// isStringLiteral(): this is StringLiteralType;
// isNumberLiteral(): this is NumberLiteralType;
// isTypeParameter(): this is TypeParameter;
// isClassOrInterface(): this is InterfaceType;
// isClass(): this is InterfaceType;
// isIndexType(): this is IndexType;

import type ts from 'typescript'

type ParameterPropertyDeclaration = ts.ParameterDeclaration & {
  parent: ts.ConstructorDeclaration
  name: ts.Identifier
}

function collapseTextChangeRangesAcrossMultipleVersions(
  changes: readonly ts.TextChangeRange[],
): ts.TextChangeRange
function getTypeParameterOwner(d: ts.Declaration): ts.Declaration | undefined
function isParameterPropertyDeclaration(
  node: Node,
  parent: Node,
): node is ParameterPropertyDeclaration
function isEmptyBindingPattern(node: ts.BindingName): node is ts.BindingPattern
function isEmptyBindingElement(
  node: ts.BindingElement | ts.ArrayBindingElement,
): boolean
function walkUpBindingElementsAndPatterns(
  binding: ts.BindingElement,
): ts.VariableDeclaration | ts.ParameterDeclaration
function getCombinedModifierFlags(node: ts.Declaration): ts.ModifierFlags
function getCombinedNodeFlags(node: Node): ts.NodeFlags
function validateLocaleAndSetLanguage(
  locale: string,
  sys: {
    getExecutingFilePath(): string
    resolvePath(path: string): string
    fileExists(fileName: string): boolean
    readFile(fileName: string): string | undefined
  },
  errors?: ts.Diagnostic[],
): void
function getOriginalNode(node: Node): Node
function getOriginalNode<T extends Node>(
  node: Node,
  nodeTest: (node: Node) => node is T,
): T
function getOriginalNode(node: Node | undefined): Node | undefined
function getOriginalNode<T extends Node>(
  node: Node | undefined,
  nodeTest: (node: Node) => node is T,
): T | undefined
function findAncestor<T extends Node>(
  node: Node | undefined,
  callback: (element: Node) => element is T,
): T | undefined
function findAncestor(
  node: Node | undefined,
  callback: (element: Node) => boolean | 'quit',
): Node | undefined
function isParseTreeNode(node: Node): boolean
function getParseTreeNode(node: Node | undefined): Node | undefined
function getParseTreeNode<T extends Node>(
  node: T | undefined,
  nodeTest?: (node: Node) => node is T,
): T | undefined
function escapeLeadingUnderscores(identifier: string): ts.__String
function unescapeLeadingUnderscores(identifier: ts.__String): string
function idText(
  identifierOrPrivateName: ts.Identifier | ts.PrivateIdentifier,
): string
function identifierToKeywordKind(
  node: ts.Identifier,
): ts.KeywordSyntaxKind | undefined
function symbolName(symbol: Symbol): string
function getNameOfJSDocTypedef(
  declaration: ts.JSDocTypedefTag,
): ts.Identifier | ts.PrivateIdentifier | undefined
function getNameOfDeclaration(
  declaration: ts.Declaration | ts.Expression | undefined,
): ts.DeclarationName | undefined
function getDecorators(
  node: ts.HasDecorators,
): readonly ts.Decorator[] | undefined
function getModifiers(node: ts.HasModifiers): readonly ts.Modifier[] | undefined
function getJSDocParameterTags(
  param: ts.ParameterDeclaration,
): readonly ts.JSDocParameterTag[]
function getJSDocTypeParameterTags(
  param: ts.TypeParameterDeclaration,
): readonly ts.JSDocTemplateTag[]
function hasJSDocParameterTags(
  node: ts.FunctionLikeDeclaration | ts.SignatureDeclaration,
): boolean
function getJSDocAugmentsTag(node: Node): ts.JSDocAugmentsTag | undefined
function getJSDocImplementsTags(node: Node): readonly ts.JSDocImplementsTag[]
function getJSDocClassTag(node: Node): ts.JSDocClassTag | undefined
function getJSDocPublicTag(node: Node): ts.JSDocPublicTag | undefined
function getJSDocPrivateTag(node: Node): ts.JSDocPrivateTag | undefined
function getJSDocProtectedTag(node: Node): ts.JSDocProtectedTag | undefined
function getJSDocReadonlyTag(node: Node): ts.JSDocReadonlyTag | undefined
function getJSDocOverrideTagNoCache(node: Node): ts.JSDocOverrideTag | undefined
function getJSDocDeprecatedTag(node: Node): ts.JSDocDeprecatedTag | undefined
function getJSDocEnumTag(node: Node): ts.JSDocEnumTag | undefined
function getJSDocThisTag(node: Node): ts.JSDocThisTag | undefined
function getJSDocReturnTag(node: Node): ts.JSDocReturnTag | undefined
function getJSDocTemplateTag(node: Node): ts.JSDocTemplateTag | undefined
function getJSDocSatisfiesTag(node: Node): ts.JSDocSatisfiesTag | undefined
function getJSDocTypeTag(node: Node): ts.JSDocTypeTag | undefined
function getJSDocType(node: Node): ts.TypeNode | undefined
function getJSDocReturnType(node: Node): ts.TypeNode | undefined
function getJSDocTags(node: Node): readonly ts.JSDocTag[]
function getAllJSDocTags<T extends ts.JSDocTag>(
  node: Node,
  predicate: (tag: ts.JSDocTag) => tag is T,
): readonly T[]
function getAllJSDocTagsOfKind(
  node: Node,
  kind: ts.SyntaxKind,
): readonly ts.JSDocTag[]
function getTextOfJSDocComment(
  comment?: string | ts.NodeArray<ts.JSDocComment>,
): string | undefined
function getEffectiveTypeParameterDeclarations(
  node: ts.DeclarationWithTypeParameters,
): readonly ts.TypeParameterDeclaration[]
function getEffectiveConstraintOfTypeParameter(
  node: ts.TypeParameterDeclaration,
): ts.TypeNode | undefined
function isMemberName(node: Node): node is ts.MemberName
function isPropertyAccessChain(node: Node): node is ts.PropertyAccessChain
function isElementAccessChain(node: Node): node is ts.ElementAccessChain
function isCallChain(node: Node): node is ts.CallChain
function isOptionalChain(
  node: Node,
): node is
  | ts.PropertyAccessChain
  | ts.ElementAccessChain
  | ts.CallChain
  | ts.NonNullChain
function isNullishCoalesce(node: Node): boolean
function isConstTypeReference(node: Node): boolean
function skipPartiallyEmittedExpressions(node: ts.Expression): ts.Expression
function skipPartiallyEmittedExpressions(node: Node): Node
function isNonNullChain(node: Node): node is ts.NonNullChain
function isBreakOrContinueStatement(
  node: Node,
): node is ts.BreakOrContinueStatement
function isNamedExportBindings(node: Node): node is ts.NamedExportBindings
function isUnparsedTextLike(node: Node): node is ts.UnparsedTextLike
function isUnparsedNode(node: Node): node is ts.UnparsedNode
function isJSDocPropertyLikeTag(node: Node): node is ts.JSDocPropertyLikeTag
function isTokenKind(kind: ts.SyntaxKind): boolean
function isToken(n: Node): boolean
function isLiteralExpression(node: Node): node is ts.LiteralExpression
function isTemplateLiteralToken(node: Node): node is ts.TemplateLiteralToken
function isTemplateMiddleOrTemplateTail(
  node: Node,
): node is ts.TemplateMiddle | ts.TemplateTail
function isImportOrExportSpecifier(
  node: Node,
): node is ts.ImportSpecifier | ts.ExportSpecifier
function isTypeOnlyImportDeclaration(
  node: Node,
): node is ts.TypeOnlyImportDeclaration
function isTypeOnlyExportDeclaration(
  node: Node,
): node is ts.TypeOnlyExportDeclaration
function isTypeOnlyImportOrExportDeclaration(
  node: Node,
): node is ts.TypeOnlyAliasDeclaration
function isStringTextContainingNode(
  node: Node,
): node is ts.StringLiteral | ts.TemplateLiteralToken
function isImportAttributeName(node: Node): node is ts.ImportAttributeName
function isModifier(node: Node): node is ts.Modifier
function isEntityName(node: Node): node is ts.EntityName
function isPropertyName(node: Node): node is ts.PropertyName
function isBindingName(node: Node): node is ts.BindingName
function isFunctionLike(node: Node | undefined): node is ts.SignatureDeclaration
function isClassElement(node: Node): node is ts.ClassElement
function isClassLike(node: Node): node is ts.ClassLikeDeclaration
function isAccessor(node: Node): node is ts.AccessorDeclaration
function isAutoAccessorPropertyDeclaration(
  node: Node,
): node is ts.AutoAccessorPropertyDeclaration
function isModifierLike(node: Node): node is ts.ModifierLike
function isTypeElement(node: Node): node is ts.TypeElement
function isClassOrTypeElement(
  node: Node,
): node is ts.ClassElement | ts.TypeElement
function isObjectLiteralElementLike(
  node: Node,
): node is ts.ObjectLiteralElementLike
function isTypeNode(node: Node): node is ts.TypeNode
function isFunctionOrConstructorTypeNode(
  node: Node,
): node is ts.FunctionTypeNode | ts.ConstructorTypeNode
function isArrayBindingElement(node: Node): node is ts.ArrayBindingElement
function isPropertyAccessOrQualifiedName(
  node: Node,
): node is ts.PropertyAccessExpression | ts.QualifiedName
function isCallLikeExpression(node: Node): node is ts.CallLikeExpression
function isCallOrNewExpression(
  node: Node,
): node is ts.CallExpression | ts.NewExpression
function isTemplateLiteral(node: Node): node is ts.TemplateLiteral
function isLeftHandSideExpression(node: Node): node is ts.LeftHandSideExpression
function isLiteralTypeLiteral(
  node: Node,
): node is
  | ts.NullLiteral
  | ts.BooleanLiteral
  | ts.LiteralExpression
  | ts.PrefixUnaryExpression
function isExpression(node: Node): node is ts.Expression
function isAssertionExpression(node: Node): node is ts.AssertionExpression
function isIterationStatement(
  node: Node,
  lookInLabeledStatements: false,
): node is ts.IterationStatement
function isIterationStatement(
  node: Node,
  lookInLabeledStatements: boolean,
): node is ts.IterationStatement | ts.LabeledStatement
function isConciseBody(node: Node): node is ts.ConciseBody
function isForInitializer(node: Node): node is ts.ForInitializer
function isModuleBody(node: Node): node is ts.ModuleBody
function isNamedImportBindings(node: Node): node is ts.NamedImportBindings
function isStatement(node: Node): node is ts.Statement
function isModuleReference(node: Node): node is ts.ModuleReference
function isJsxTagNameExpression(node: Node): node is ts.JsxTagNameExpression
function isJsxChild(node: Node): node is ts.JsxChild
function isJsxAttributeLike(node: Node): node is ts.JsxAttributeLike
function isStringLiteralOrJsxExpression(
  node: Node,
): node is ts.StringLiteral | ts.JsxExpression
function isJsxOpeningLikeElement(node: Node): node is ts.JsxOpeningLikeElement
function isCaseOrDefaultClause(node: Node): node is ts.CaseOrDefaultClause
function isJSDocCommentContainingNode(node: Node): boolean
function isSetAccessor(node: Node): node is ts.SetAccessorDeclaration
function isGetAccessor(node: Node): node is ts.GetAccessorDeclaration
function hasOnlyExpressionInitializer(
  node: Node,
): node is ts.HasExpressionInitializer
function isObjectLiteralElement(node: Node): node is ts.ObjectLiteralElement
function isStringLiteralLike(
  node: Node | ts.FileReference,
): node is ts.StringLiteralLike
function isJSDocLinkLike(
  node: Node,
): node is ts.JSDocLink | ts.JSDocLinkCode | ts.JSDocLinkPlain
function hasRestParameter(
  s: ts.SignatureDeclaration | ts.JSDocSignature,
): boolean
function isRestParameter(
  node: ts.ParameterDeclaration | ts.JSDocParameterTag,
): boolean
const unchangedTextChangeRange: ts.TextChangeRange

function getJSDocCommentsAndTags(
  hostNode: Node,
): readonly (ts.JSDoc | ts.JSDocTag)[]
function createUnparsedSourceFile(text: string): ts.UnparsedSource
function createUnparsedSourceFile(
  inputFile: ts.InputFiles,
  type: 'js' | 'dts',
  stripInternal?: boolean,
): ts.UnparsedSource
function createUnparsedSourceFile(
  text: string,
  mapPath: string | undefined,
  map: string | undefined,
): ts.UnparsedSource
function createInputFiles(
  javascriptText: string,
  declarationText: string,
): ts.InputFiles
function createInputFiles(
  javascriptText: string,
  declarationText: string,
  javascriptMapPath: string | undefined,
  javascriptMapText: string | undefined,
  declarationMapPath: string | undefined,
  declarationMapText: string | undefined,
): ts.InputFiles
function createInputFiles(
  readFileText: (path: string) => string | undefined,
  javascriptPath: string,
  javascriptMapPath: string | undefined,
  declarationPath: string,
  declarationMapPath: string | undefined,
  buildInfoPath: string | undefined,
): ts.InputFiles
function createSourceMapSource(
  fileName: string,
  text: string,
  skipTrivia?: (pos: number) => number,
): ts.SourceMapSource
function setOriginalNode<T extends Node>(node: T, original: Node | undefined): T
const factory: ts.NodeFactory
function disposeEmitNodes(sourceFile: ts.SourceFile | undefined): void
function setEmitFlags<T extends Node>(node: T, emitFlags: ts.EmitFlags): T

function getSourceMapRange(node: Node): ts.SourceMapRange

function setSourceMapRange<T extends Node>(
  node: T,
  range: ts.SourceMapRange | undefined,
): T

function getTokenSourceMapRange(
  node: Node,
  token: ts.SyntaxKind,
): ts.SourceMapRange | undefined

function setTokenSourceMapRange<T extends Node>(
  node: T,
  token: ts.SyntaxKind,
  range: ts.SourceMapRange | undefined,
): T

function getCommentRange(node: Node): ts.TextRange

function setCommentRange<T extends Node>(node: T, range: ts.TextRange): T
function getSyntheticLeadingComments(
  node: Node,
): ts.SynthesizedComment[] | undefined
function setSyntheticLeadingComments<T extends Node>(
  node: T,
  comments: ts.SynthesizedComment[] | undefined,
): T
function addSyntheticLeadingComment<T extends Node>(
  node: T,
  kind:
    | ts.SyntaxKind.SingleLineCommentTrivia
    | ts.SyntaxKind.MultiLineCommentTrivia,
  text: string,
  hasTrailingNewLine?: boolean,
): T
function getSyntheticTrailingComments(
  node: Node,
): ts.SynthesizedComment[] | undefined
function setSyntheticTrailingComments<T extends Node>(
  node: T,
  comments: ts.SynthesizedComment[] | undefined,
): T
function addSyntheticTrailingComment<T extends Node>(
  node: T,
  kind:
    | ts.SyntaxKind.SingleLineCommentTrivia
    | ts.SyntaxKind.MultiLineCommentTrivia,
  text: string,
  hasTrailingNewLine?: boolean,
): T
function moveSyntheticComments<T extends Node>(node: T, original: Node): T

function getConstantValue(
  node: ts.AccessExpression,
): string | number | undefined

function setConstantValue(
  node: ts.AccessExpression,
  value: string | number,
): ts.AccessExpression

function addEmitHelper<T extends Node>(node: T, helper: ts.EmitHelper): T

function addEmitHelpers<T extends Node>(
  node: T,
  helpers: ts.EmitHelper[] | undefined,
): T

function removeEmitHelper(node: Node, helper: ts.EmitHelper): boolean

function getEmitHelpers(node: Node): ts.EmitHelper[] | undefined

function moveEmitHelpers(
  source: Node,
  target: Node,
  predicate: (helper: ts.EmitHelper) => boolean,
): void
function isNumericLiteral(node: Node): node is ts.NumericLiteral
function isBigIntLiteral(node: Node): node is ts.BigIntLiteral
function isStringLiteral(node: Node): node is ts.StringLiteral
function isJsxText(node: Node): node is ts.JsxText
function isRegularExpressionLiteral(
  node: Node,
): node is ts.RegularExpressionLiteral
function isNoSubstitutionTemplateLiteral(
  node: Node,
): node is ts.NoSubstitutionTemplateLiteral
function isTemplateHead(node: Node): node is ts.TemplateHead
function isTemplateMiddle(node: Node): node is ts.TemplateMiddle
function isTemplateTail(node: Node): node is ts.TemplateTail
function isDotDotDotToken(node: Node): node is ts.DotDotDotToken
function isPlusToken(node: Node): node is ts.PlusToken
function isMinusToken(node: Node): node is ts.MinusToken
function isAsteriskToken(node: Node): node is ts.AsteriskToken
function isExclamationToken(node: Node): node is ts.ExclamationToken
function isQuestionToken(node: Node): node is ts.QuestionToken
function isColonToken(node: Node): node is ts.ColonToken
function isQuestionDotToken(node: Node): node is ts.QuestionDotToken
function isEqualsGreaterThanToken(node: Node): node is ts.EqualsGreaterThanToken
function isIdentifier(node: Node): node is ts.Identifier
function isPrivateIdentifier(node: Node): node is ts.PrivateIdentifier
function isAssertsKeyword(node: Node): node is ts.AssertsKeyword
function isAwaitKeyword(node: Node): node is ts.AwaitKeyword
function isQualifiedName(node: Node): node is ts.QualifiedName
function isComputedPropertyName(node: Node): node is ts.ComputedPropertyName
function isTypeParameterDeclaration(
  node: Node,
): node is ts.TypeParameterDeclaration
function isParameter(node: Node): node is ts.ParameterDeclaration
function isDecorator(node: Node): node is ts.Decorator
function isPropertySignature(node: Node): node is ts.PropertySignature
function isPropertyDeclaration(node: Node): node is ts.PropertyDeclaration
function isMethodSignature(node: Node): node is ts.MethodSignature
function isMethodDeclaration(node: Node): node is ts.MethodDeclaration
function isClassStaticBlockDeclaration(
  node: Node,
): node is ts.ClassStaticBlockDeclaration
function isConstructorDeclaration(node: Node): node is ts.ConstructorDeclaration
function isGetAccessorDeclaration(node: Node): node is ts.GetAccessorDeclaration
function isSetAccessorDeclaration(node: Node): node is ts.SetAccessorDeclaration
function isCallSignatureDeclaration(
  node: Node,
): node is ts.CallSignatureDeclaration
function isConstructSignatureDeclaration(
  node: Node,
): node is ts.ConstructSignatureDeclaration
function isIndexSignatureDeclaration(
  node: Node,
): node is ts.IndexSignatureDeclaration
function isTypePredicateNode(node: Node): node is ts.TypePredicateNode
function isTypeReferenceNode(node: Node): node is ts.TypeReferenceNode
function isFunctionTypeNode(node: Node): node is ts.FunctionTypeNode
function isConstructorTypeNode(node: Node): node is ts.ConstructorTypeNode
function isTypeQueryNode(node: Node): node is ts.TypeQueryNode
function isTypeLiteralNode(node: Node): node is ts.TypeLiteralNode
function isArrayTypeNode(node: Node): node is ts.ArrayTypeNode
function isTupleTypeNode(node: Node): node is ts.TupleTypeNode
function isNamedTupleMember(node: Node): node is ts.NamedTupleMember
function isOptionalTypeNode(node: Node): node is ts.OptionalTypeNode
function isRestTypeNode(node: Node): node is ts.RestTypeNode
function isUnionTypeNode(node: Node): node is ts.UnionTypeNode
function isIntersectionTypeNode(node: Node): node is ts.IntersectionTypeNode
function isConditionalTypeNode(node: Node): node is ts.ConditionalTypeNode
function isInferTypeNode(node: Node): node is ts.InferTypeNode
function isParenthesizedTypeNode(node: Node): node is ts.ParenthesizedTypeNode
function isThisTypeNode(node: Node): node is ts.ThisTypeNode
function isTypeOperatorNode(node: Node): node is ts.TypeOperatorNode
function isIndexedAccessTypeNode(node: Node): node is ts.IndexedAccessTypeNode
function isMappedTypeNode(node: Node): node is ts.MappedTypeNode
function isLiteralTypeNode(node: Node): node is ts.LiteralTypeNode
function isImportTypeNode(node: Node): node is ts.ImportTypeNode
function isTemplateLiteralTypeSpan(
  node: Node,
): node is ts.TemplateLiteralTypeSpan
function isTemplateLiteralTypeNode(
  node: Node,
): node is ts.TemplateLiteralTypeNode
function isObjectBindingPattern(node: Node): node is ts.ObjectBindingPattern
function isArrayBindingPattern(node: Node): node is ts.ArrayBindingPattern
function isBindingElement(node: Node): node is ts.BindingElement
function isArrayLiteralExpression(node: Node): node is ts.ArrayLiteralExpression
function isObjectLiteralExpression(
  node: Node,
): node is ts.ObjectLiteralExpression
function isPropertyAccessExpression(
  node: Node,
): node is ts.PropertyAccessExpression
function isElementAccessExpression(
  node: Node,
): node is ts.ElementAccessExpression
function isCallExpression(node: Node): node is ts.CallExpression
function isNewExpression(node: Node): node is ts.NewExpression
function isTaggedTemplateExpression(
  node: Node,
): node is ts.TaggedTemplateExpression
function isTypeAssertionExpression(node: Node): node is ts.TypeAssertion
function isParenthesizedExpression(
  node: Node,
): node is ts.ParenthesizedExpression
function isFunctionExpression(node: Node): node is ts.FunctionExpression
function isArrowFunction(node: Node): node is ts.ArrowFunction
function isDeleteExpression(node: Node): node is ts.DeleteExpression
function isTypeOfExpression(node: Node): node is ts.TypeOfExpression
function isVoidExpression(node: Node): node is ts.VoidExpression
function isAwaitExpression(node: Node): node is ts.AwaitExpression
function isPrefixUnaryExpression(node: Node): node is ts.PrefixUnaryExpression
function isPostfixUnaryExpression(node: Node): node is ts.PostfixUnaryExpression
function isBinaryExpression(node: Node): node is ts.BinaryExpression
function isConditionalExpression(node: Node): node is ts.ConditionalExpression
function isTemplateExpression(node: Node): node is ts.TemplateExpression
function isYieldExpression(node: Node): node is ts.YieldExpression
function isSpreadElement(node: Node): node is ts.SpreadElement
function isClassExpression(node: Node): node is ts.ClassExpression
function isOmittedExpression(node: Node): node is ts.OmittedExpression
function isExpressionWithTypeArguments(
  node: Node,
): node is ts.ExpressionWithTypeArguments
function isAsExpression(node: Node): node is ts.AsExpression
function isSatisfiesExpression(node: Node): node is ts.SatisfiesExpression
function isNonNullExpression(node: Node): node is ts.NonNullExpression
function isMetaProperty(node: Node): node is ts.MetaProperty
function isSyntheticExpression(node: Node): node is ts.SyntheticExpression
function isPartiallyEmittedExpression(
  node: Node,
): node is ts.PartiallyEmittedExpression
function isCommaListExpression(node: Node): node is ts.CommaListExpression
function isTemplateSpan(node: Node): node is ts.TemplateSpan
function isSemicolonClassElement(node: Node): node is ts.SemicolonClassElement
function isBlock(node: Node): node is ts.Block
function isVariableStatement(node: Node): node is ts.VariableStatement
function isEmptyStatement(node: Node): node is ts.EmptyStatement
function isExpressionStatement(node: Node): node is ts.ExpressionStatement
function isIfStatement(node: Node): node is ts.IfStatement
function isDoStatement(node: Node): node is ts.DoStatement
function isWhileStatement(node: Node): node is ts.WhileStatement
function isForStatement(node: Node): node is ts.ForStatement
function isForInStatement(node: Node): node is ts.ForInStatement
function isForOfStatement(node: Node): node is ts.ForOfStatement
function isContinueStatement(node: Node): node is ts.ContinueStatement
function isBreakStatement(node: Node): node is ts.BreakStatement
function isReturnStatement(node: Node): node is ts.ReturnStatement
function isWithStatement(node: Node): node is ts.WithStatement
function isSwitchStatement(node: Node): node is ts.SwitchStatement
function isLabeledStatement(node: Node): node is ts.LabeledStatement
function isThrowStatement(node: Node): node is ts.ThrowStatement
function isTryStatement(node: Node): node is ts.TryStatement
function isDebuggerStatement(node: Node): node is ts.DebuggerStatement
function isVariableDeclaration(node: Node): node is ts.VariableDeclaration
function isVariableDeclarationList(
  node: Node,
): node is ts.VariableDeclarationList
function isFunctionDeclaration(node: Node): node is ts.FunctionDeclaration
function isClassDeclaration(node: Node): node is ts.ClassDeclaration
function isInterfaceDeclaration(node: Node): node is ts.InterfaceDeclaration
function isTypeAliasDeclaration(node: Node): node is ts.TypeAliasDeclaration
function isEnumDeclaration(node: Node): node is ts.EnumDeclaration
function isModuleDeclaration(node: Node): node is ts.ModuleDeclaration
function isModuleBlock(node: Node): node is ts.ModuleBlock
function isCaseBlock(node: Node): node is ts.CaseBlock
function isNamespaceExportDeclaration(
  node: Node,
): node is ts.NamespaceExportDeclaration
function isImportEqualsDeclaration(
  node: Node,
): node is ts.ImportEqualsDeclaration
function isImportDeclaration(node: Node): node is ts.ImportDeclaration
function isImportClause(node: Node): node is ts.ImportClause
function isImportTypeAssertionContainer(
  node: Node,
): node is ts.ImportTypeAssertionContainer

function isAssertClause(node: Node): node is ts.AssertClause

function isAssertEntry(node: Node): node is ts.AssertEntry
function isImportAttributes(node: Node): node is ImportAttributes
function isImportAttribute(node: Node): node is ts.ImportAttribute
function isNamespaceImport(node: Node): node is ts.NamespaceImport
function isNamespaceExport(node: Node): node is ts.NamespaceExport
function isNamedImports(node: Node): node is ts.NamedImports
function isImportSpecifier(node: Node): node is ts.ImportSpecifier
function isExportAssignment(node: Node): node is ts.ExportAssignment
function isExportDeclaration(node: Node): node is ts.ExportDeclaration
function isNamedExports(node: Node): node is ts.NamedExports
function isExportSpecifier(node: Node): node is ts.ExportSpecifier
function isMissingDeclaration(node: Node): node is ts.MissingDeclaration
function isNotEmittedStatement(node: Node): node is ts.NotEmittedStatement
function isExternalModuleReference(
  node: Node,
): node is ts.ExternalModuleReference
function isJsxElement(node: Node): node is ts.JsxElement
function isJsxSelfClosingElement(node: Node): node is ts.JsxSelfClosingElement
function isJsxOpeningElement(node: Node): node is ts.JsxOpeningElement
function isJsxClosingElement(node: Node): node is ts.JsxClosingElement
function isJsxFragment(node: Node): node is ts.JsxFragment
function isJsxOpeningFragment(node: Node): node is ts.JsxOpeningFragment
function isJsxClosingFragment(node: Node): node is ts.JsxClosingFragment
function isJsxAttribute(node: Node): node is ts.JsxAttribute
function isJsxAttributes(node: Node): node is ts.JsxAttributes
function isJsxSpreadAttribute(node: Node): node is ts.JsxSpreadAttribute
function isJsxExpression(node: Node): node is ts.JsxExpression
function isJsxNamespacedName(node: Node): node is ts.JsxNamespacedName
function isCaseClause(node: Node): node is ts.CaseClause
function isDefaultClause(node: Node): node is ts.DefaultClause
function isHeritageClause(node: Node): node is ts.HeritageClause
function isCatchClause(node: Node): node is ts.CatchClause
function isPropertyAssignment(node: Node): node is ts.PropertyAssignment
function isShorthandPropertyAssignment(
  node: Node,
): node is ts.ShorthandPropertyAssignment
function isSpreadAssignment(node: Node): node is ts.SpreadAssignment
function isEnumMember(node: Node): node is ts.EnumMember

function isUnparsedPrepend(node: Node): node is ts.UnparsedPrepend
function isSourceFile(node: Node): node is ts.SourceFile
function isBundle(node: Node): node is ts.Bundle

function isUnparsedSource(node: Node): node is ts.UnparsedSource
function isJSDocTypeExpression(node: Node): node is ts.JSDocTypeExpression
function isJSDocNameReference(node: Node): node is ts.JSDocNameReference
function isJSDocMemberName(node: Node): node is ts.JSDocMemberName
function isJSDocLink(node: Node): node is ts.JSDocLink
function isJSDocLinkCode(node: Node): node is ts.JSDocLinkCode
function isJSDocLinkPlain(node: Node): node is ts.JSDocLinkPlain
function isJSDocAllType(node: Node): node is ts.JSDocAllType
function isJSDocUnknownType(node: Node): node is ts.JSDocUnknownType
function isJSDocNullableType(node: Node): node is ts.JSDocNullableType
function isJSDocNonNullableType(node: Node): node is ts.JSDocNonNullableType
function isJSDocOptionalType(node: Node): node is ts.JSDocOptionalType
function isJSDocFunctionType(node: Node): node is ts.JSDocFunctionType
function isJSDocVariadicType(node: Node): node is ts.JSDocVariadicType
function isJSDocNamepathType(node: Node): node is ts.JSDocNamepathType
function isJSDoc(node: Node): node is ts.JSDoc
function isJSDocTypeLiteral(node: Node): node is ts.JSDocTypeLiteral
function isJSDocSignature(node: Node): node is ts.JSDocSignature
function isJSDocAugmentsTag(node: Node): node is ts.JSDocAugmentsTag
function isJSDocAuthorTag(node: Node): node is ts.JSDocAuthorTag
function isJSDocClassTag(node: Node): node is ts.JSDocClassTag
function isJSDocCallbackTag(node: Node): node is ts.JSDocCallbackTag
function isJSDocPublicTag(node: Node): node is ts.JSDocPublicTag
function isJSDocPrivateTag(node: Node): node is ts.JSDocPrivateTag
function isJSDocProtectedTag(node: Node): node is ts.JSDocProtectedTag
function isJSDocReadonlyTag(node: Node): node is ts.JSDocReadonlyTag
function isJSDocOverrideTag(node: Node): node is ts.JSDocOverrideTag
function isJSDocOverloadTag(node: Node): node is ts.JSDocOverloadTag
function isJSDocDeprecatedTag(node: Node): node is ts.JSDocDeprecatedTag
function isJSDocSeeTag(node: Node): node is ts.JSDocSeeTag
function isJSDocEnumTag(node: Node): node is ts.JSDocEnumTag
function isJSDocParameterTag(node: Node): node is ts.JSDocParameterTag
function isJSDocReturnTag(node: Node): node is ts.JSDocReturnTag
function isJSDocThisTag(node: Node): node is ts.JSDocThisTag
function isJSDocTypeTag(node: Node): node is ts.JSDocTypeTag
function isJSDocTemplateTag(node: Node): node is ts.JSDocTemplateTag
function isJSDocTypedefTag(node: Node): node is ts.JSDocTypedefTag
function isJSDocUnknownTag(node: Node): node is ts.JSDocUnknownTag
function isJSDocPropertyTag(node: Node): node is ts.JSDocPropertyTag
function isJSDocImplementsTag(node: Node): node is ts.JSDocImplementsTag
function isJSDocSatisfiesTag(node: Node): node is ts.JSDocSatisfiesTag
function isJSDocThrowsTag(node: Node): node is ts.JSDocThrowsTag
function isQuestionOrExclamationToken(
  node: Node,
): node is ts.QuestionToken | ts.ExclamationToken
function isIdentifierOrThisTypeNode(
  node: Node,
): node is ts.Identifier | ts.ThisTypeNode
function isReadonlyKeywordOrPlusOrMinusToken(
  node: Node,
): node is ts.ReadonlyKeyword | ts.PlusToken | ts.MinusToken
function isQuestionOrPlusOrMinusToken(
  node: Node,
): node is ts.QuestionToken | ts.PlusToken | ts.MinusToken
function isModuleName(node: Node): node is ts.ModuleName
function isBinaryOperatorToken(node: Node): node is ts.BinaryOperatorToken
