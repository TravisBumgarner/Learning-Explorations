import { css, createGlobalStyle } from 'styled-components'

const PRIMARY_COLOR = '#000000'
const SECONDARY_COLOR = '#FFFFFF'
const TERTIARY_COLOR = '#4acfa0'

// Media Queries
const SCREEN_WIDTHS = {
    desktop: 1200,
    tablet: 768,
    phone: 376
}

const media = Object.keys(SCREEN_WIDTHS).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${SCREEN_WIDTHS[label] / 16}em) {
            ${css(...args)}
        }
    `

    return acc
}, {})

const GlobalStyle = createGlobalStyle`
    html {
        background-color: rgb(250,250,250);
        font-size: 16px;
        ${media.tablet`font-size: 14px;`}
    }
`

export { media, PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, GlobalStyle }
