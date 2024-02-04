## Helper three (Under development!!)

Helper three uses the "simple" part of the Ts analyser,
to get it's AST, then copy it to it's own verion of AST.

> This is also done by other libs like TSNode, Babal ect. (Consider using them before beginnig with this)

### Challenges with TS compiler api

Typescript compiler api are only in beta.

It is original only an analyser and translater to javascript.

It uses a file-system approach, so for most analyser and transforming,
require a SourceFile node, and a Context.

This can makes it hard to make simple code changes, transformation, node type replace and removal and insertion of new node.

One problem is that new node are bound to a SourceFile, and to get some properties like the node's content (text),
position and other properties, can only be done in a tranformation context scope.

> Node inserted in a Ts compiler ast are missing position

### When is a Custom Tree

For complex visitors qnd transformers it mostliky better to use the ts compiler api,
or one of the other ast libraries like tsnode, babel.

This helper ast tried to make it easy to:

- Make need simple ts transformation, like code (string) based.
- Allow insertion af string template code into the the node tree
- Mix ast, string and regexp transformations
- Getting positions, text for any code change at all times.
- Simplify the ast and simplify creations of new node.

It most likely not this helper ast you should use if:

- You need context like other files etc.
- Type referense ect. and the more complex analyses that ts compiler ast and other provides.
- If/when the ts compiler api make it's implements what this helper try to provide !
