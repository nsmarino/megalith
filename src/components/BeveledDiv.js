import React from 'react'
import styled from "@emotion/styled"

const BeveledDiv = styled.div`
  background-color: #dbc7cb;
  border-left: 2px solid black;
  border-right: 2px solid black;
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
    <div style={{filter: 'drop-shadow(0px 2px 0px rgb(0, 0, 0))'}}>
        <div style={{filter: 'drop-shadow(0px -2px 0px rgb(0, 0, 0))'}}>
            {children}
        </div>
    </div>
  )
}


const BevelCard = () => {
  const cornerAngle = 45

  return (
  <Border>
    <BeveledDiv
      cornerAngleRadian={((cornerAngle * Math.PI) / 180)}
    >
      <div>Content of div</div>
    </BeveledDiv>
  </Border>
  )
}

export default BevelCard