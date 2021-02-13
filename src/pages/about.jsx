import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Layout } from "../components";
import { GithubContributions } from "react-github-graph";
import { GoodreadsBookshelf } from "react-goodreads-shelf";
import Img from "gatsby-image";

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
`;

const AboutPage = ({ location, data: { profile } }) => (

	<Layout pathname={location.pathname}>
		<Container type="text">
			<Columns>
				<div>
					<h1>About</h1>
					<p>
						Thanks for checking out my site.
						I&#39;m a software engineer based in Seattle.
						If you are looking to hire an experienced front-end developer, please check out my <a href="/resume">resume</a> and feel free to <a href="/contact">contact me</a> any time.
						Outside work, I enjoy hiking, soccer, cooking, reading, and spending time with family.
					</p>
				</div>
				<div>
					<br />
					<Img fluid={profile.childImageSharp.fluid} alt="Kyle and Kristin in the Rockies" />
				</div>
			</Columns>

			<GithubContributions username="kylekarpack"></GithubContributions>

			<div className="recently-read">
				<h2>Recently Read</h2>
				<GoodreadsBookshelf userId="63515611" limit={18} width="10%" />
			</div>
		</Container>
	</Layout>
);

export default AboutPage;

AboutPage.propTypes = {
	location: PropTypes.object.isRequired,
	data: PropTypes.shape({
		profile: PropTypes.object.isRequired,
	}).isRequired,
};

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
