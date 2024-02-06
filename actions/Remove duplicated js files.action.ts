// find all files that has postfix .gtest.ts

import { Glob } from "bun"
import fs from "fs"

const glob = new Glob("**/*.gtest.ts")
const scanner = glob.scan({
  absolute: true,
  onlyFiles: true,
})

let count = 0
// rename files to .tf.ts
for await (const file of scanner) {
  const jsFileName = file.replace(/\.tf\.ts$/, ".tf.js")
  if (fs.existsSync(jsFileName)) {
    fs.unlinkSync(jsFileName)
    count++
    console.log(`removed ${file}`)
  }
}
console.log(`Deleted ${count} files`)
