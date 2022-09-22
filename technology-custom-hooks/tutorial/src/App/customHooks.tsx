import { useState, useEffect, useRef } from "react"

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

const useMediaRecorder = ({onstop, ondataavailable}: UseMediaRecorderProps) => {
    const mediaStream = useRef<MediaStream>(null)
    const mediaRecorder = useRef<MediaRecorder>(null)

    const mediaStreamConstraints: MediaStreamConstraints = {preferCurrentTab: true}
    const getMediaStream = async () => {
        mediaStream.current = await navigator.mediaDevices.getDisplayMedia(mediaStreamConstraints)
    }
    // const data: Blob[] = []

    const startRecording = async () => {
        if(!mediaStream.current) {
            await getMediaStream()
        }

        mediaRecorder.current = new MediaRecorder(
            mediaStream.current,
            {}
        )
        
        mediaRecorder.current.ondataavailable = ondataavailable
    
        mediaRecorder.current.onstop = onstop

        mediaRecorder.current.start()
    }

    const stopRecording = () => {
        mediaRecorder.current.stop()
    }

    return {startRecording, stopRecording}
}



export {
    useLocalStorage,
    useMediaRecorder
}