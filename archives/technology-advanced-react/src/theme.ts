import { createGlobalStyle } from 'styled-components'
import { darken, lighten } from 'polished'

const colorFactory = (color: string) => ({
    base: color,
    darkest: darken(0.25, color),
    darken: darken(0.10, color),
    lighten: lighten(0.10, color),
    lightest: lighten(0.25, color),
})

const dark1 = colorFactory('#00204f') // should be greenish for positive actions
const light1 = colorFactory('#14d4ff')
const disabledlight = colorFactory('#999999')
const warninglight = colorFactory('#fffa5c')


const coffee = colorFactory('#282828')

const colors = {
  dark1,
  light1,
  disabledlight,
  warninglight
}

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 16px;
        font-weight: 400;
        background-color: ${colors.dark1.base};
        font-family: 'Nunito', sans-serif;
    }
    body {
        margin: 0;
    }
    body > div#root {
        display: flex;
        justify-content: center;
        width: 100vw;
    }
`

export { GlobalStyle, colors }