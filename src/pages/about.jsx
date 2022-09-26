import { Container, Row, Col, Text, Spacer } from "@nextui-org/react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import React from "react";
import { GithubContributions } from "react-github-graph";
import { GoodreadsBookshelf } from "react-goodreads-shelf";
import { Layout } from "../components";
import { bookFilter } from "../util/bookFilter";

const AboutPage = ({ location, data: { profile } }) => (
	<Layout pathname={location.pathname}>
		<Spacer />
		<Container css={{ maxWidth: "55em" }}>
			<Row>
				<Col span={7}>
					<Text h1>About</Text>
					<Text size="$lg">
						Thanks for checking out my site. I&#39;m a software engineer based
						in Seattle. If you are looking to hire an experienced front-end
						developer, please check out my <a href="/resume">resume</a> and feel
						free to <a href="/contact">contact me</a> any time. Outside work, I
						enjoy hiking, soccer, cooking, reading, and spending time with
						family.
					</Text>
				</Col>
				<Col span={4} offset={1}>
					<Spacer />
					<GatsbyImage
						image={profile.childImageSharp.gatsbyImageData}
						alt="Kyle and Kristin in the Rockies"
					/>
				</Col>
			</Row>

			<Spacer y={3} />

			<GithubContributions username="kylekarpack" />

			<Spacer y={3} />

			<div className="recently-read">
				<h2>Recently Read</h2>
				<GoodreadsBookshelf
					userId="63515611"
					limit={16}
					width={100}
					filter={bookFilter}
					displayOptions={{ hideDetails: true }}
				/>

				<Link to="/about/reading">See more</Link>
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
				gatsbyImageData(layout: FULL_WIDTH)
			}
		}
	}
`;
