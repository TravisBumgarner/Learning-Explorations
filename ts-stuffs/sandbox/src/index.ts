const t = require('io-ts')

const fooWithTypeScript = (bar: string): string => {
    return bar
}

const fooWithRunTypes = (bar) => {
    return t.string.decode(bar)
}

console.log(fooWithRunTypes('foo'))
console.log(fooWithRunTypes(null))