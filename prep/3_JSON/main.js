const lexicalAnalysis = require("./lexicalAnalysis")
const parseTokens = require("./parseTokens")

const main = (json) => {
    const tokens = lexicalAnalysis(json)
    console.log(tokens)
    const object = parseTokens(tokens)
    return object
}

console.log(main('{"a": "hello", "b": 5, "c": {"d": "hello"}}'))
