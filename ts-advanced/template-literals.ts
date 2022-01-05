type Size = "small" | "medium" | "large"
type Color = "primary" | "secondary"

type Style = `${Color}-${Size}`

const applyStyle = (style: Style) => { }

applyStyle('foo-bar')
applyStyle('primary-small')
applyStyle('secondary-large')