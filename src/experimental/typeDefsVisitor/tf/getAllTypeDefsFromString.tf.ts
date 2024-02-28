import { getAllTypeDefsFromString } from 'src/experimental/typeDefsVisitor/getAllTypeDefsFromString'

const code = `
import foo1 from "foo1"
import * as foo2 from "foo2"
import { foo3 } from "foo3"
import { foo5 as foo4 } from "foo5"
`

const types = getAllTypeDefsFromString({ content: code })

types.forEach((t) => {
  console.log(t.getText())
})
