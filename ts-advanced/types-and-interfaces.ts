interface IPoint2D {
    x: number;
    y: number;
}

interface IPoint3D extends IPoint2D {
    z: number
}

const point: IPoint2D = {
    x: 1,
    y: 2,
    z: 3
}

type TPoint2D {
    x: number;
    y: number;
}

// type TPoint3D extends TPoint2D {
//     z: number
// }

const point2: TPoint2D = {
    x: 1,
    y: 2,
    z: 3
}