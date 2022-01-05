type Add = (a: number, b: number) => number

const add: Add = (a, b) => {
    return a + b
}



type CrazyObjectInput = {
    a: {
        b: {
            c: {
                d: number
            }
        }
    }
}


type CrazyObjectOutput = {
    a: {
        b: {
            c: {
                d: string
            }
        }
    }
}

type Foo2 = (input: CrazyObjectInput) => CrazyObjectOutput

const foo2: Foo2 = ({ a: { b: { c: { d } } } }) => {
    return {
        a: {
            b: {
                c: {
                    d: `${d}`
                }
            }
        }
    }
}

export default add