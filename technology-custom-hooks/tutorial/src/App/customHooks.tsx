import { useState, useEffect } from "react"

const getSavedValue = (key: string, initialValue: any) => {
    const savedValue = JSON.parse(localStorage.getItem(key))

    if (savedValue) return savedValue

    if (initialValue instanceof Function) return initialValue()

    return initialValue
}

const useLocalStorage = <T extends any>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
        return getSavedValue(key, defaultValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}

type UseMediaRecorderProps = {
    onstop: (e: Event) => void
    ondataavailable: (e: Event) => void
}



const useMediaRecorder = async ({onstop, ondataavailable}: UseMediaRecorderProps) => {
    const getMediaStream = async () => {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
        return stream
    }

    const data: Blob[] = []

    const stream = getMediaStream()
    const mediaRecorder = new MediaRecorder(stream)
    
    mediaRecorder.ondataavailable = ondataavailable
    
    mediaRecorder.onstop = onstop

    const startRecording = () => {
        mediaRecorder.start()
    }

    const stopRecording = () => {
        mediaRecorder.stop()
    }

    return {startRecording, stopRecording}
}



export {
    useLocalStorage,
    useMediaRecorder
}