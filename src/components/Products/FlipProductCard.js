import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styled from "@emotion/styled"

const CardContainer = styled.div`
  position: relative;
  z-index: ${props => props.zIndex};
  height: 15rem;
  width: 10rem;
  margin: 1rem;
  .cardBody {
    transform: ${props => props.transform};
    animation: ${props => props.animation};
  }

  @keyframes float {
    0% {    transform: translate(0px) rotate(2deg); }
    50%{    transform: translate(-50px,50px) rotate(2deg); }
    100%{   transform: translate(0px) rotateY(180deg) rotate(2deg); }
  }
`

const CardBody = styled.div`
  transform-style: preserve-3d;
  transition: all .7s linear;
  width: 100%;
  height: 100%;

  .cardSide {
    width: 100%;
    height: 15rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    top: 0;
    background-color: #dbc7cb;
    border-radius: 10px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
      h2, a {
      font-weight: normal;
      font-size: 3rem;
      text-decoration: none;
      margin: 0;
      padding: 0;
      animation: blinking 3s infinite;
    }
    font-family: Megalith-Regular; 
  }

  .cardBack {
    z-index: 2;
    transform: rotateY(180deg);
    .productImage {
      min-width: 5rem;
    }
  }
  .cardFront {
    img {
      width: 100%;
    }
    &:hover {
      cursor: pointer;
    }
  }


  @keyframes blinking {
    0% {    color: #000; }
    30%{    color: #fff; }
    100%{   color: #000; }
  }
`

const BeveledDiv = styled.div`
  background-color: #dbc7cb;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-left: 1px solid black;
  border-right: 1px solid black;
  width: 8rem;
  height: 12rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  clip-path: polygon(
    ${props => Math.sin(props.cornerAngleRadian)}rem 0%, 
    0% ${props => Math.cos(props.cornerAngleRadian)}rem,

    0% calc(100% - ${props => Math.cos(props.cornerAngleRadian)}rem),
    ${props => Math.sin(props.cornerAngleRadian)}rem 100%,

    calc(100% - ${props => Math.sin(props.cornerAngleRadian)}rem) 100%,
    100% calc(100% - ${props => Math.cos(props.cornerAngleRadian)}rem), 

    100% ${props => Math.cos(props.cornerAngleRadian)}rem,
    calc(100% - ${props => Math.sin(props.cornerAngleRadian)}rem) 0%
    );
`
const Border = ({children}) => {
  return (
    <>
    <div style={{filter: 'drop-shadow(0px 1px 0px rgb(0, 0, 0))'}}>
         <div style={{filter: 'drop-shadow(0px -1px 0px rgb(0, 0, 0))'}}>
            {children}
        </div>
     </div>
    </>
  )
}

const CardFront = () => {
  const cornerAngle = 45

  return (
  <Border>
    <BeveledDiv 
      className="cardFront cardSide"
      cornerAngleRadian={((cornerAngle * Math.PI) / 180)}
    >
      <img src="stoneCircle.png" alt="stone circle"/>
    </BeveledDiv>
  </Border>
  )
}

const CardBack= ({ product }) => {
  const cornerAngle = 45

  return (
    <BeveledDiv 
      className="cardBack cardSide"
      cornerAngleRadian={((cornerAngle * Math.PI) / 180)}
    >
      <Link 
        to={`/products/${product.id}`} 
        style={
          {width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }
        }
      >

      <h2>Explore</h2>
      <Img 
          fluid={product.gatsbyImage.node.childImageSharp.fluid} 
          alt={product.name} 
          className="productImage"
        />
      <h2>Explore</h2>
      </Link>
    </BeveledDiv>
  )
}

const FlipCard = ({ product }) => {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    let timer 
    if (flipped) {
      timer = setTimeout(() => 
      setFlipped(false), 5000
      )    
    }
    return () => {
      clearTimeout(timer)
    }
  }, [flipped])

  return (
    <CardContainer 
      onClick={() => {
        setFlipped(true)
      }} 
      transform={flipped ? 'rotateY(180deg) rotate(2deg)' : 'rotate(2deg)'}
      animation={flipped ? 'float 1.5s' : ''}
      zIndex={flipped ? '100' : '1'}
    >
      <CardBody className="cardBody">
        <CardBack className="cardBack" product={product} />
        <CardFront />
      </CardBody>
    </CardContainer>
  )
}

export default FlipCard

// &:hover {
//   .cardBody .cardFront {
//     opacity: 0;
//     visibility: hidden;
//     transition: opacity 1s ease-in, visibility .75s linear;    }
// }