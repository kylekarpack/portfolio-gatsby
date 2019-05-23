import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Container, Layout } from '../components'

const Content = styled(Container)`
  text-align: center;
`

const ContactPage = ({ location }) => (
  <Layout pathname={location.pathname}>
    <Content type="text">
		<h1>Contact</h1>
		<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
	</Content>
  </Layout>
)

export default ContactPage

ContactPage.propTypes = {
  location: PropTypes.object.isRequired,
}
