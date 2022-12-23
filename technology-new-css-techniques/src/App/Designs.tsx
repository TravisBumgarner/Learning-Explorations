import styled from 'styled-components'

const BananaWrapper = styled.div`
  animation-name: rotate;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  font-size: 50px;

  @keyframes rotate {
    0% {
      transform: rotate(-30deg);
    }
    50% {
      transform: rotate(30deg);
    }
    100% {
      transform: rotate(-30deg);
    }
   
  }
`

const Designs = () => {
  return (
    <BananaWrapper>
      <p>🍌</p>
    </BananaWrapper>
  )
}

export default Designs
