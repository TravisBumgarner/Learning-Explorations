const lexicalAnalysis = require("./lexicalAnalysis")

test("Lexical Analysis is correct", () => {
    ;[
        ["{}", ["{", "}"]],
        ['{"foo":"bar"}', ["{", "foo", ":", "bar", "}"]],
        ['{"foo":5125.2}', ["{", "foo", ":", 5125.2, "}"]],
        ["false", [false]],
        ["true", [true]],
        ["null", [null]],
        ["undefined", [undefined]],
    ].forEach(([input, expectedOutput]) => {
        expect(lexicalAnalysis(input)).toStrictEqual(expectedOutput)
    })
})
