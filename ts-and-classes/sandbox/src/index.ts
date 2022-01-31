type ConstructorParams = {
    a: string
    b: number
}

class A {
    a: string
    b: number

    constructor(params: ConstructorParams) {
        this.a = params.a
        this.b = params.b
    }
}

const a = new A({ a: 'foo', b: 5 })


class SpreadArgs {
    a: string
    b: number

    constructor(params: ConstructorParams) {
        for (let key of Object.keys(params)) {
            this[key]
        }
    }
}
