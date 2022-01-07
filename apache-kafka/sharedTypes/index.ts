type Color = 'red' | 'green' | 'blue'

type ColorCounts = Record<Color, number>

type ButtonPress = {
    id: string
    color: Color
    timestamp: Date
}

export {
    ColorCounts,
    Color,
    ButtonPress
}