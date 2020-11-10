import React, { useState } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styled from "@emotion/styled"

const CardContainer = styled.div`
  position: relative;
  z-index: 1;
  height: 15rem;
  width: 10rem;
  margin: 1rem;
  .cardBody {
    transform: ${props => props.transform}
  }
`

const CardBody = styled.div`
  transform-style: preserve-3d;
  transition: all .7s linear;
  width: 100%;
  height: 100%;
  .cardSide {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #dbc7cb;
  border: 2px solid black;
  border-radius: 10px;
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

const CardFront = () => {
  return (
    <div className="cardFront cardSide">
      <img src="stoneCircle.png" alt="stone circle"/>
    </div>
  )
}

const CardBack= ({ product }) => {
  return (
    <div className="cardBack cardSide">
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
    </div>
  )
}

const FlipCard = ({ product }) => {
  const [flipped, setFlipped] = useState(false)
  console.log(product)
  return (
    <CardContainer 
      onClick={() => {
        setFlipped(true)
        setTimeout(() => setFlipped(false), 3000)
      }} 
      transform={flipped ? 'rotateY(180deg)' : ''}
    >
      <CardBody className="cardBody">
        <CardBack className="cardBack" product={product} />
        <CardFront className="cardFront" />
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