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
  const newFile = file.replace(/\.gtest\.ts$/, ".tf.ts")
  console.log(`rename ${file} to ${newFile}`)
  fs.renameSync(file, newFile)
  count++
}
console.log(`Done renaming ${count} files`)
