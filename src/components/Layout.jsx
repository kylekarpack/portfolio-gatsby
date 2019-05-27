import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import 'typeface-cabin'
import 'typeface-palanquin'
import SEO from './SEO'
import Navigation from './Navigation'
import Footer from './Footer'
import theme from '../../config/theme'
import reset from '../styles/reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, input, textarea, button {
    font-family: "Cabin", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  h1, h2, h3, h4, h5, h6, nav a {
	font-family: "Palanquin", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-weight: 700;
  }
  .nav-active {
    color: ${theme.brand.primary} !important;
  }
`

// We can pass customSEO here to not include the <SEO> component twice. This prop is 'true' on the project template
// as the SEO component there passes in some additional things. Otherwise things would be inserted two times

const Layout = ({ children, pathname, customSEO }) => (
  <ThemeProvider theme={theme}>
    <>
      {!customSEO && <SEO pathname={pathname} />}
      <GlobalStyle />
      <Navigation />
      {children}
      <Footer />
    </>
  </ThemeProvider>
)

export default Layout

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  pathname: PropTypes.string.isRequired,
  customSEO: PropTypes.bool,
}

Layout.defaultProps = {
  customSEO: false,
}
