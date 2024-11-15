import styled from 'styled-components'

export type WrapperProps = {
  $backgroundColor?: string
  $color?: string
}

export const Wrapper = styled.div<WrapperProps>`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$color};
  flex-direction: column;
`
