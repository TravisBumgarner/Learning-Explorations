type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>
type Exactly<T, K extends keyof T> = Pick<T, K>

const logger = (message: any) => {
    console.log(JSON.stringify(message)) // eslint-disable-line
}

export {
    logger,
    AtLeast,
    Exactly,
}