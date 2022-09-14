import { useState, useEffect } from "react"

const getSavedValue = (key: string, initialValue: any) => {
    const savedValue = JSON.parse(localStorage.getItem(key))

    if(savedValue) return savedValue

    if(initialValue instanceof Function) return initialValue()

    return initialValue
}

const useLocalStorage = <T extends any>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
        return getSavedValue(key, defaultValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue ]
}

export {
    useLocalStorage
}