import React from 'react';
import Script from 'react-load-script'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Layout, Github } from '../components';
import Img from "gatsby-image";

const Content = styled(Container)`
	.recently-read {
		animation: fadein .5s ease-in-out;
		#gr_grid_widget_1558937354 {
			h2 {
				display: none;
			}
		}
	}
	.gr_grid_container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
		> br, > a {
			display: none;
		}
		img {
			max-width: 100%;
		}
	}
`

const Columns = styled(Container)`
	display: grid;
	max-width: 100%;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 2vw;
	padding: 0;
	img {
		max-width: 100%;
	}
	@media (max-width: ${props => props.theme.breakpoints.m}) {
		display: block;
	}
`

const AboutPage = ({ location, data: { profile } }) => (

	<Layout pathname={location.pathname}>
		<Content type="text">
			<Columns>
				<div>
					<h1>About</h1>
					<p>
						Thanks for checking out my site.
						I'm a software engineer based in Seattle.
						If you are looking to hire an experienced front-end developer, please check out my <a href="/resume">resume</a> and feel free to <a href="/contact">contact me</a> any time.
						Outside work, I enjoy hiking, soccer, cooking, reading, and spending time with family.
					</p>
				</div>
				<div>
					<br />
					<Img fluid={profile.childImageSharp.fluid} alt="Kyle and Kristin in the Rockies" />
				</div>
			</Columns>

			<Github username="kylekarpack"></Github>

			<div className="recently-read">
				<h2>Recently Read</h2>
				<div id="gr_grid_widget_1558937354"></div>
				<Script
					url="https://www.goodreads.com/review/grid_widget/63515611.Kyle's%20bookshelf:%20read?cover_size=medium&hide_link=true&hide_title=true&num_books=10&order=d&shelf=read&sort=date_read&widget_id=1558937354"
					type="text/javascript"></Script>
			</div>
	</Content>
  </Layout>
)
		
export default AboutPage
		
AboutPage.propTypes = {
	location: PropTypes.object.isRequired,
	data: PropTypes.shape({
		profile: PropTypes.object.isRequired,
	}).isRequired,
}

export const pageQuery = graphql`
	query AboutQuery {
		profile: file(relativePath: { eq: "rockies.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1200) {
					...GatsbyImageSharpFluid
				}
			}
		} 
	}`;
