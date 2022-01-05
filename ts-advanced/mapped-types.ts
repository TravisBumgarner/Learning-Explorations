type Point = {
    x: number
    y: number
}

// To make read only

type ReadOnlyPoint1 = {
    readonly x: number
    readonly y: number
}

// OR

type ReadOnlyPoint2 = Readonly<Point>

// OR

type ReadOnlyPoint3 = {
    readonly [Key in 'x' | 'y']: number
}
// Key here is a looping variable

// OR

type ReadOnlyPoint4 = {
    readonly [Key in 'x' | 'y']: Point[Key]
}


// OR

type ReadOnlyPoint5 = {
    readonly [Key in keyof Point]: Point[Key]
}

// OR

type ReadOnly<T> = {
    readonly [Key in keyof T]: T[Key]
}

const readOnly6: ReadOnly<Point> = {
    x: 5,
    y: 6
}

readOnly6.x = 4

// Cannot redefine because x is readonly