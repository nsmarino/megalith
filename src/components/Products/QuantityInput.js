import React from 'react'
import styled from "@emotion/styled"

const Styles = styled.div`
display: flex;
justify-content: center;
margin: 1rem;
  button {
    border: 1px solid black;
    background: none;
    width: 2rem;
    height: 2rem;

    &:hover {
      cursor: pointer;
      background: white;
    }

  }
  input {
    border: 1px solid black;
    background: none;
    width: 4rem;
    height: 2rem;
    text-align: center;
  }
`

const QuantityInput = ({ register, getValues, setValue, name }) => {

    const handleMinus = (e) => {
      e.preventDefault()
      const value = parseInt(getValues(`${name}`),10)
      setValue(`${name}`, value > 1 ? value - 1 : 1)
      }
    
    const handlePlus = (e) => {
      e.preventDefault()
      const value = parseInt(getValues(`${name}`),10)
      setValue(`${name}`, value < 25 ? value + 1 : 25)
    }
  
    return (
    <Styles>
      <button onClick={handleMinus}>-</button>
      <input type="number" name={name} ref={register({ required: true })} />
      <button onClick={handlePlus}>+</button>
    </Styles>
    )
  }

export default QuantityInput