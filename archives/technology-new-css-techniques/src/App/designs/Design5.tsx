import styled from 'styled-components'

import { Metadata } from 'sharedComponents'
import { useEffect, useMemo, useRef, useState } from 'react'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(4, 25%);
  height: 80vh;
  width: 100vw;
`

const SharedButtonStyles = styled.button`
  border: 0;
  border-radius: 0;
  background-color: transparent;
  cursor: pointer;
`

const SharedDivStyles = styled.div`
  align-self: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button1 = styled(SharedButtonStyles)`
  border-radius: 1rem;
  color: #00ffff; 
  background-color: #2a2a2a;
  padding: 1rem;
`
const Wrapper1 = styled(SharedDivStyles)`
  background-color: #00ffff;
`
const Button2 = styled(SharedButtonStyles)`
  overflow: hidden;
  padding: 0;
  transition: padding 1s, background-color 0.25s, border-radius 1s;
  box-sizing: border-box;
  border-radius: 0rem;
  
  &:hover {
    border-radius: 1rem;
    padding: 1rem;
    background-color: yellow;
  }
`
const Wrapper2 = styled(SharedDivStyles)`
  background-color: red;
`
const Button3 = styled(SharedButtonStyles)`
  box-shadow: rgb(185 185 185 / 52%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px;
  padding: 1rem;
  border-radius: 1rem;
  background-color: white;
`
const Wrapper3 = styled(SharedDivStyles)`
  background-color: rgb(255, 231, 151);
  
`
const Button4 = styled(SharedButtonStyles)`
    border: 3px solid #4d4d4d;
    color: #4d4d4d;
    padding: 1rem;
    border-radius: 0;
    background-color: #b1b5ce;
    font-weight: 900;
    transition: border-radius border-color background-color color 0.5s;
    transition: border-radius border-color background-color color 0.5s;
    transition: border-radius border-color background-color color 0.5s;
    transition: border-radius 0.5s, border-color 0.5s, background-color 0.5s, color 0.5s;

    &:hover {
      border-radius: 1rem;
      color: #b1b5ce;
      background-color: #4d4d4d;
      border-color: #b1b5ce;
    }
    
`
const Wrapper4 = styled(SharedDivStyles)`
  background: #eaeaea;
`
const Button5 = styled(SharedButtonStyles)`
`
const Wrapper5 = styled(SharedDivStyles)`
`
const Button6 = styled(SharedButtonStyles)`
`
const Wrapper6 = styled(SharedDivStyles)`
`
const Button7 = styled(SharedButtonStyles)`
`
const Wrapper7 = styled(SharedDivStyles)`
`
const Button8 = styled(SharedButtonStyles)`
`
const Wrapper8 = styled(SharedDivStyles)`
`
const Button9 = styled(SharedButtonStyles)`
`
const Wrapper9 = styled(SharedDivStyles)`
`
const Button10 = styled(SharedButtonStyles)`
`
const Wrapper10 = styled(SharedDivStyles)`
`
const Button11 = styled(SharedButtonStyles)`
`
const Wrapper11 = styled(SharedDivStyles)`
`
const Button12 = styled(SharedButtonStyles)`
`
const Wrapper12 = styled(SharedDivStyles)`
`
const Button13 = styled(SharedButtonStyles)`
`
const Wrapper13 = styled(SharedDivStyles)`
`
const Button14 = styled(SharedButtonStyles)`
`
const Wrapper14 = styled(SharedDivStyles)`
`
const Button15 = styled(SharedButtonStyles)`
`
const Wrapper15 = styled(SharedDivStyles)`
`
const Button16 = styled(SharedButtonStyles)`
`
const Wrapper16 = styled(SharedDivStyles)`
`
const Button17 = styled(SharedButtonStyles)`
`
const Wrapper17 = styled(SharedDivStyles)`
`
const Button18 = styled(SharedButtonStyles)`
`
const Wrapper18 = styled(SharedDivStyles)`
`
const Button19 = styled(SharedButtonStyles)`
`
const Wrapper19 = styled(SharedDivStyles)`
`
const Button20 = styled(SharedButtonStyles)`
`
const Wrapper20 = styled(SharedDivStyles)`
`


const Design5 = () => {
  const onClick = () => console.log('clicked')

  return (
    <Wrapper>
      <Wrapper1><Button1>Button 1</Button1></Wrapper1>
      <Wrapper2><Button2>Button 2</Button2></Wrapper2>
      <Wrapper3><Button3>Button 3</Button3></Wrapper3>
      <Wrapper4><Button4>Button 4</Button4></Wrapper4>
      <Wrapper5><Button5>Button 5</Button5></Wrapper5>
      <Wrapper6><Button6>Button 6</Button6></Wrapper6>
      <Wrapper7><Button7>Button 7</Button7></Wrapper7>
      <Wrapper8><Button8>Button 8</Button8></Wrapper8>
      <Wrapper9><Button9>Button 9</Button9></Wrapper9>
      <Wrapper10><Button10>Button 10</Button10></Wrapper10>
      <Wrapper11><Button11>Button 11</Button11></Wrapper11>
      <Wrapper12><Button12>Button 12</Button12></Wrapper12>
      <Wrapper13><Button13>Button 13</Button13></Wrapper13>
      <Wrapper14><Button14>Button 14</Button14></Wrapper14>
      <Wrapper15><Button15>Button 15</Button15></Wrapper15>
      <Wrapper16><Button16>Button 16</Button16></Wrapper16>
      <Wrapper17><Button17>Button 17</Button17></Wrapper17>
      <Wrapper18><Button18>Button 18</Button18></Wrapper18>
      <Wrapper19><Button19>Button 19</Button19></Wrapper19>
      <Wrapper20><Button20>Button 20</Button20></Wrapper20>
    </Wrapper>
  )
}

export default Design5
