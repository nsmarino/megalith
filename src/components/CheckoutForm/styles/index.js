import styled from '@emotion/styled'

const StyledSelectContainer = styled.div`
  width: 20rem;
  display: flex;
  justify-content: space-between;
  select {
    width: 9.75rem;
    height: 2rem;
    border: 1px solid black;
  }
`

const StyledCheckboxContainer = styled.div`
input {
    width: 1rem;
    padding-bottom: 0;
    height: inherit;
    display: inline;
    margin: 0;
}
p {
    font-family: sans-serif;
    font-size: 0.75rem;
}
`

export { StyledSelectContainer, StyledCheckboxContainer }