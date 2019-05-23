import styled from 'styled-components'

const Hero = styled.section`
  position: relative;
  margin-top: -4rem;
  height: ${props => (props.single ? '30vh' : '40vh')};
  overflow: hidden;
  margin-bottom: ${props => (props.single ? '2rem' : '3rem')};
  @media (max-width: ${props => props.theme.breakpoints.m}), (max-device-width: ${props => props.theme.breakpoints.m}) {
    ${props => (props.single ? '40vh' : '60vh')};
  }
  @media (max-width: ${props => props.theme.breakpoints.s}), (max-device-width: ${props => props.theme.breakpoints.s}) {
    ${props => (props.single ? '300px' : '400px')};
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}),
    (max-device-width: ${props => props.theme.breakpoints.xs}) {
    height: 400px;
    margin-top: -7rem;
  }
`

export default Hero
