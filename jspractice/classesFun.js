class Foo {
    constructor(a, b, c) {
        this.a = a
        this.b = b
        this.c = c
    }

    bar = () => {
        return this.a * this.b * this.c
    }

    foo() {
        return this.a + this.b + this.c
    }

    *getA() {
        for (let i = 0; i < this.a; i++) {
            yield i;
        }
    }

}

const foo = new Foo(1, 2, 3)
console.log(foo.foo())
console.log(foo.getA())
console.log(foo.getA())
console.log(foo.getA())