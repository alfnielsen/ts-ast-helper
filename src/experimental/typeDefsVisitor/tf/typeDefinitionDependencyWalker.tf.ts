import { nodeKind } from 'src/base/printer/nodeKind'
import { typeDefinitionDependencyWalker } from 'src/experimental/typeDefsVisitor/typeDefinitionDependencyWalker'

const code = `
import foo1 from "foo1"
import * as foo2 from "foo2"
import { foo3 } from "foo3"
import { foo5 as foo4 } from "foo5"
import { foo51 as foo41 } from "foo51"
import dddd222 from "foo51"

enum Color {
  Red = 1,
  Green,
  Blue,
}
enum ee1 {
  foo1,
  foo2,
}

const v1: foo3 = 23;
type tc = t5 | {
  f: foo41,
  f2: foo2,
  co: Color
}
type t = {
  t1: {
    ddd: t3 & {
      d: dddd222,
      fs: {
        f: ee1
      }
    }
  },
  ch: tc,
  chs: tc[]
}
type t2 = {
  t1: foo2
  ch: foo3,
  chs: foo4
}
type t3 = {
  t1: foo2
}
type t5 = {
  t1: t66
}
type t66 = string | number
type opt = {
  v: t
}
type resp = Record<t, t2>

function f(o: foo1): resp {}

`

let i = 0
typeDefinitionDependencyWalker({
  content: code,
  type: 'resp',
  predicate(n) {
    console.log(++i + ': ' + n.getText())
  },
})

enum Color {
  Red = 1,
  Green,
  Blue,
}

type tc = {
  co: Color
}
