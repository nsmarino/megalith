import React from 'react'
import styled from "@emotion/styled"

const StyledButton = styled.button`
    font-family: Computer Modern;
    background: transparent;
    font-size: 1.25rem;
    border: 1px solid black;
    a {
        color: inherit;
        text-decoration: none;
    }
    &:hover {
    background: var(--striped-hover);
    cursor: pointer;
    border: 1px solid white;
    }
`

const Button = ({children, onClick}) => <StyledButton onClick={onClick}>{children}</StyledButton>

export default Button
