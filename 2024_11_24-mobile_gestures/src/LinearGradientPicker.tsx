import { useState } from "react"

const LinearGradientPicker = () => {
    const [width, setWidth] = useState(200)
    const [height, setHeight] = useState(200)

    return (
        <p>{width},{height}</p>
    )

}


export default LinearGradientPicker