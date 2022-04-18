import { darken, lighten } from 'polished'

const colorFactory = (color: string) => ({
    base: color,
    darkest: darken(0.25, color),
    darken: darken(0.10, color),
    lighten: lighten(0.1, color),
    lightest: lighten(0.25, color),
})

const PRIMARY = colorFactory('#57E2E5')
const SECONDARY = colorFactory('#6A7FDB')
const TERTIARY = colorFactory('#45CB85')
const ALERT = colorFactory('#E08DAC')
const DISABLED = colorFactory('#aaaaaa')
const DARKNESS = colorFactory('#242424')

export default {
    PRIMARY,
    SECONDARY,
    TERTIARY,
    ALERT,
    DARKNESS,
    DISABLED
}