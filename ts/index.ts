const foo = <T extends string | number, U>(foo: T, bar: U): U => {
    return bar
}

const bar = foo(5, 5)
