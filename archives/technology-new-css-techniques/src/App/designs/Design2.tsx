import styled from 'styled-components'

import { Metadata } from 'sharedComponents'

const BananaWrapper = styled.div`
  animation-name: rotate;
  
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes rotate {
    0% {
      transform: rotate(0);
      font-size:0px;
    }
    25% {
      transform: rotate(360deg);
      font-size:100px;
    }
    50% {
      transform: rotate(0deg);
      font-size:100px;
    }
    75% {
      transform: rotate(360deg);
      font-size:100px;
    }
    100% {
      transform: rotate(720deg);
      font-size:0;
    }
   
   
  }
`

const Design2 = () => {
  return (
    <div>

      <BananaWrapper>
        <p>🍌</p>
      </BananaWrapper>
      <Metadata>
        Created 12/20/2022
      </Metadata>
    </div >
  )
}

export default Design2
