type Point3D = {
    x: number,
    y: number,
    z: number
}

type PartialType<T> = {
    [Key in keyof T]+?: T[Key]
}

type PointLessDimensions = PartialType<Point3D>

const removeDimensions = <T>(obj: T, keysToRemove: (keyof T)[]): PartialType<T> => {
    const reducedDimensions: PartialType<T> = { ...obj }

    for (let key of keysToRemove) {
        delete reducedDimensions[key]
    }

    return reducedDimensions
}

const point2D = removeDimensions({ x: 1, y: 2, z: 3 }, ['x'])

console.log(point2D)


// -------------------

type Foo = {
    a?: number,
    b: string,
    c?: boolean
}

type RequireAll<T> = {
    [Key in keyof T]-?: T[Key]
}

type RequiredFoo = RequireAll<Foo>

// ----------------

type Numbers<T> = {
    [Key in keyof T]: number
}

type RequiredNumbersFoo = RequireAll<Numbers<Foo>>

// ----------------

type Strings<T> = {
    [Key in keyof T]: string
}

const numberifyAllParams = <T>(obj: Strings<T>): Partial<Numbers<T>> => {
    const modifiedObj: Partial<Numbers<T>> = {}

    for (const key in Object.keys(obj)) {
        modifiedObj[key] = parseFloat(obj[key])
    }
    return modifiedObj
}

const result = numberifyAllParams({ a: '5' })
