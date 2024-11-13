type RGBColor = { r: number; g: number; b: number }

const WEB_COLORS_16_RGB: { [key: string]: RGBColor } = {
  black: { r: 0, g: 0, b: 0 },
  white: { r: 255, g: 255, b: 255 },
  red: { r: 255, g: 0, b: 0 },
  lime: { r: 0, g: 255, b: 0 },
  blue: { r: 0, g: 0, b: 255 },
  yellow: { r: 255, g: 255, b: 0 },
  cyan: { r: 0, g: 255, b: 255 },
  magenta: { r: 255, g: 0, b: 255 },
  silver: { r: 192, g: 192, b: 192 },
  gray: { r: 128, g: 128, b: 128 },
  maroon: { r: 128, g: 0, b: 0 },
  olive: { r: 128, g: 128, b: 0 },
  green: { r: 0, g: 128, b: 0 },
  purple: { r: 128, g: 0, b: 128 },
  teal: { r: 0, g: 128, b: 128 },
  navy: { r: 0, g: 0, b: 128 }
}

const colorDiff = (color1: RGBColor, color2: RGBColor) => {
  return Math.sqrt(
    (color1.r - color2.r) ** 2 +
      (color1.g - color2.g) ** 2 +
      (color1.b - color2.b) ** 2
  )
}

export const mapRGBToNearestWebColor = (
  r: number,
  g: number,
  b: number
): RGBColor => {
  let nearestColor = WEB_COLORS_16_RGB.white
  let nearestColorDiff = colorDiff(WEB_COLORS_16_RGB.white, { r, g, b })

  for (const color in WEB_COLORS_16_RGB) {
    const diff = colorDiff(WEB_COLORS_16_RGB[color], { r, g, b })
    if (diff < nearestColorDiff) {
      nearestColor = WEB_COLORS_16_RGB[color]
      nearestColorDiff = diff
    }
  }

  return nearestColor
}
