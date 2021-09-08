const parseTokens = require("./parseTokens")

test("Tokens are parsed correctly", () => {
    ;[
        [["{", "}"], {}],
        [["{", "foo", ":", "bar", "}"], { foo: "bar" }],
        [["{", "foo", ":", 5125.2, "}"], { foo: 5125.2 }],
        [["{", "a", ":", "b", "c", ":", "d", "}"], { a: "b", c: "d" }],
        [["{", "a", ":", "{", "c", ":", "d", "}", "}"], { a: { c: "d" } }],
        ["false", false],
        ["0.25", 0.25],
    ].forEach(([input, expectedOutput]) => {
        expect(parseTokens(input)).toStrictEqual(expectedOutput)
    })
})
