
const basePath =  
const baseType 
const reg = /(?<=\n\s*function )(is\w+).*?\((node:[^,\)]*?)\): node is ([^\n]+)/g

//console.log(content)
let m = reg.exec(content)
while(m){
    const name = m[1].trim()
    const args = m[2].trim()
    const type = m[3].replace(";","").trim()
    n.write.gray`function `.magenta`${name}`.cyan`(${args})`.gray`: `.green(type)`\n`
    m = reg.exec(content)
}
