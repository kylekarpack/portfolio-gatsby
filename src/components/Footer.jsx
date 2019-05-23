import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  margin: 6rem 0 1rem 0;
  padding: 1rem ${props => props.theme.spacer.horizontal};
  text-align: center;
  color: ${props => props.theme.colors.grey};
  a {
    text-decoration: none;
    color: ${props => props.theme.brand.primary};
  }
`
const year = new Date().getFullYear();
const Footer = () => (
  <Wrapper data-testid="footer">
    Copyright &copy; {year} Kyle Karpack
  </Wrapper>
)

export default Footer
