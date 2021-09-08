const parseTokens = (tokens) => {
    let i = 0
    let output

    if (tokens.length === 1) {
        return tokens[0]
    }
    while (i < tokens.length) {
        if (tokens[i] === "{") {
            const object = {}
            let enumeratingKeysAndValues = true

            while (enumeratingKeysAndValues) {
                console.log("gg")
                i++
                if (i >= tokens.length) {
                    enumeratingKeysAndValues = false
                } else if (tokens[i] === ",") {
                    i++
                } else {
                    const key = tokens[i]
                    i += 2 // skip :
                    let value
                    if (tokens[i] === "{") {
                        const closingBracket = tokens.indexOf("}", i)
                        value = parseTokens(tokens.slice(i, closingBracket))
                        i = closingBracket
                    } else {
                        value = tokens[i]
                    }
                    object[key] = value
                }
                output = object
            }
        }
        i++
    }
    return output
}

module.exports = parseTokens
