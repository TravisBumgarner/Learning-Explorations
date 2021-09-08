const STRUCTURAL_CHARACTERS = ["{", "}", ":", ","]

const NUMERICAL_CHARACTERS = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
]

const parseString = (json, startIndex) => {
    let token = ""
    let i = startIndex

    while (json[i + 1] !== '"') {
        i++
        token += json[i]
    }

    i++

    return [token, i]
}

const parseNumber = (json, startIndex) => {
    let i = startIndex
    let token = json[i]

    while (NUMERICAL_CHARACTERS.includes(json[i + 1])) {
        i++
        token += json[i]
    }

    return [parseFloat(token), i]
}

const parseSpecial = (json, startIndex) => {
    let i
    let token

    const specialMapping = {
        undefined: undefined,
        null: null,
        false: false,
        true: true,
    }

    Object.keys(specialMapping).forEach((key) => {
        if (json.slice(startIndex, startIndex + key.length) === key) {
            token = specialMapping[key]
            i = startIndex + key.length
        }
    })

    return [token, i]
}

const lexicalAnalysis = (json) => {
    const tokens = []

    let i = 0
    while (i < json.length) {
        if (STRUCTURAL_CHARACTERS.includes(json[i])) {
            tokens.push(json[i])
        } else if (json[i] === '"') {
            const [token, nextIndex] = parseString(json, i)
            tokens.push(token)
            i = nextIndex
        } else if (NUMERICAL_CHARACTERS.includes(json[i])) {
            const [token, nextIndex] = parseNumber(json, i)
            tokens.push(token)
            i = nextIndex
        } else {
            const [token, nextIndex] = parseSpecial(json, i)
            tokens.push(token)
            i = nextIndex
        }
        i++
    }

    return tokens
}

module.exports = lexicalAnalysis
