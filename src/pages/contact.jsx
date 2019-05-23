import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Container, Layout } from '../components'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl"


const Content = styled(Container)`
  margin: 0 auto;
  input, textarea {
	  padding: .75em 1em;
	  width: 100%;
	  display: block;
	  border: 1px solid #ccc;
	  margin-bottom: 1em;
	  font-size: 16px;
	  font-family: sans-serif;
  }
  button {
	background: ${props => props.theme.brand.primary};
	color: #fff;
	padding: .5em 2em;
	font-size: 1em;
	border: none;

  }
`
 
const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoia3lsZWthcnBhY2siLCJhIjoiY2pvZXZmNTh4MDZ2dzN3bm1pbmk1dDlmZiJ9.Gapqs5j98RUsHOBl2rqOGQ"
});

const ContactPage = ({ location }) => (
  <Layout pathname={location.pathname}>

	<Map
		style="mapbox://styles/mapbox/outdoors-v10"
		center={[-122.3258, 47.6798]}
		zoom={[11]}
		containerStyle={{
			height: "35vh",
			width: "100vw"
		}}>
	</Map>

    <Content type="text">
		<h1>Contact</h1>
		{/* <h3>Get in Touch</h3>
		<p>Have an idea for a project? Want me to work for you? Send me a message here and I’ll get back to you as soon as possible.</p>

		<h3>Based Out of the PNW</h3>
		<p>Born and raised here, I love the Pacific Northwest and plan on being here for a long while.</p> */}
		<form method="POST" action="https://formspree.io/kylekarpack@gmail.com">
			<input type="text" name="name" placeholder="Your name" />
			<input type="email" name="email" placeholder="Your email" />
			<textarea name="message" placeholder="Your Message" rows="4"></textarea>
			<button type="submit">Send</button>
		</form>
	</Content>
  </Layout>
)

export default ContactPage

ContactPage.propTypes = {
  location: PropTypes.object.isRequired,
}
