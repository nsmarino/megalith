import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styled from "@emotion/styled"

const CardContainer = styled.div`
  position: relative;
  z-index: ${props => props.zIndex};
  height: 20rem;
  width: 15rem;
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
    height: 100%;
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
    border: 2px solid #444;
    transform: rotateY(180deg);
    .productImage {
      min-width: 5rem;
    }
  }

  .cardFront {
    .cardFace {
      min-width: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      z-index: 1;
 
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

const CardFront = ({product}) => {
  return (
    <div 
      className="cardFront cardSide"
    >
    <Img 
      fluid={product.cardFace.node.childImageSharp.fluid} 
      alt='cardFace' 
      className="cardFace"
    />
    </div>
  )
}

const CardBack= ({ product }) => {
  return (
  <div className="cardBack cardSide">
    <Link 
      to={`/products/${product.id}`} 
      style={{
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        alignItems: 'center' 
      }}
    >
      <h2>Explore</h2>
      <Img 
          fluid={product.gatsbyImage.node.childImageSharp.fluid} 
          alt={product.name} 
          className="productImage"
        />
      <h2>Explore</h2>
      </Link>
    </div>

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
      animation={flipped ? 'float 1s' : ''}
      zIndex={flipped ? '100' : '1'}
    >
      <CardBody className="cardBody">
        <CardBack className="cardBack" product={product} />
        <CardFront className="cardFront" product={product} />
      </CardBody>
    </CardContainer>
  )
}

export default FlipCard

// Beveled clip-path:
// clip-path: polygon(
//   ${props => Math.sin(props.cornerAngleRadian)}rem 0%, 
//   0% ${props => Math.cos(props.cornerAngleRadian)}rem,

//   0% calc(100% - ${props => Math.cos(props.cornerAngleRadian)}rem),
//   ${props => Math.sin(props.cornerAngleRadian)}rem 100%,

//   calc(100% - ${props => Math.sin(props.cornerAngleRadian)}rem) 100%,
//   100% calc(100% - ${props => Math.cos(props.cornerAngleRadian)}rem), 

//   100% ${props => Math.cos(props.cornerAngleRadian)}rem,
//   calc(100% - ${props => Math.sin(props.cornerAngleRadian)}rem) 0%
//   );

// const Border = ({children}) => {
//   return (
//     <>
//     <div style={{filter: 'drop-shadow(0px 1px 0px rgb(0, 0, 0))'}}>
//          <div style={{filter: 'drop-shadow(0px -1px 0px rgb(0, 0, 0))'}}>
//             {children}
//         </div>
//      </div>
//     </>
//   )
// }