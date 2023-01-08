interface Foobar {
    node: () => string,
    chrome: () => string,
    electron: () => string,
    ping: () => Promise<string>
}

declare global {
    interface Window {
        foobar: Foobar
    }
}

export { Foobar }