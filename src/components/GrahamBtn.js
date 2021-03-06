import React, {useState } from 'react'
import { Link } from "gatsby"
import useMediaQuery from '../hooks/useMediaQuery'

import styled from "@emotion/styled"

const Container = styled.div`
  display: grid;
  width: 15rem;
  height: 5rem;
  margin: 3rem;

  @media (max-width: 600px) {
    width: 8rem;
    height: 2rem;
    margin: 1rem;
  }
`

const StyledBox = styled.div`
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 100%;
  background: ${props=>props.stripes};
  filter: ${props=>props.filter};
  transform: ${props => props.transform};
  transition: transform 200ms;
  `

  const StyledBtnContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1;
  grid-row: 1;
  transform: translateZ(1em);
`

const StyledBtn = styled.div`
  outline: none;
  box-shadow: none;
  font-family: Megalith-Regular;
  color: ${props => props.color};
  background: none;
  border: none;
  font-size: 700%;

  @media (max-width: 600px) {
    font-size: 300%;
  }
`

const Btn = ({text, link}) => {
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)

  const bottomTransform = useMediaQuery(
    ['(max-width: 600px)'],
    ['rotate(2deg) translateX(-0.5em) translateY(0.5em) translateZ(-0.5em)'],
    'rotate(2deg) translateX(-1em) translateY(1em) translateZ(-1em)'
    )
  
  const topTransform = useMediaQuery(
    ['(max-width: 600px)'],
    ['rotate(2deg) translateX(0.5em) translateY(-0.5em) translateZ(0.5em)'],
    'rotate(2deg) translateX(1em) translateY(-1em) translateZ(-1em)'
    )

  const getTransform = defaultState => {
    if (hover && !focus) return `rotate(2deg) translateZ(-1em)`
    else if (hover && focus) return `rotate(2deg) translateX(1em) translateY(1em) translateZ(-1em)`
    else return defaultState
  }

  return (
    <Container 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setFocus(false)
        setHover(false)
      }} 
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
    
    <StyledBox 
       stripes='var(--striped-hover-opposite)' 
       transform={getTransform(bottomTransform)}
       filter={focus ? `invert(100%)` : `invert(0%)`}
      />

     <StyledBox 
       stripes='var(--striped-hover)'
       transform={getTransform(topTransform)} 
       filter={focus ? `invert(100%)` : `invert(0%)`}
    />   
     
      <StyledBtnContainer>
        <Link to={link} style={{outline: 'none', textDecoration: 'none'}}>
          <StyledBtn 
            color={focus ? `white` : `black`}
          >
              {text}
          </StyledBtn>
        </Link>
      </StyledBtnContainer>

      </Container>
  )
}

export default Btn


/* This is good gradient code but im not gonna use it here
background-size: 6px 6px !important;
  background-image: linear-gradient(${props=>props.angle}, transparent 46%, ${props=>props.color} 49%, ${props=>props.color} 51%, transparent 55%, transparent);
 */ 