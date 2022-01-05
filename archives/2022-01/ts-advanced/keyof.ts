type X = {
    a: number,
    b: number
}

type Y = keyof X


const logValue = <T>(obj: T, key: keyof T) => {
    console.log(obj[key])
}


const x: X = { a: 5, b: 6 }

