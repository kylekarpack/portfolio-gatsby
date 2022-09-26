import { Container, Grid, Spacer } from "@nextui-org/react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { config, useTrail } from "react-spring";
import { Layout, ProjectItem } from "../components";

const Portfolio = ({
	data: {
		allMdx: { edges: projectEdges },
	},
	location,
}) => {
	return (
		<Layout pathname={location.pathname}>
			<Container>
				<Spacer />
				<h1>Recent Work</h1>
				<Spacer />
				<Grid.Container gap={2} justify="center">
					{projectEdges.map((edge, index) => (
						<Grid xs={12} sm={4} md={3} key={edge.node.fields.slug}>
							<ProjectItem testid={`projectItem-${index}`} node={edge.node} />
						</Grid>
					))}
				</Grid.Container>
			</Container>
		</Layout>
	);
};

export default Portfolio;

Portfolio.propTypes = {
	data: PropTypes.shape({
		allMdx: PropTypes.shape({
			edges: PropTypes.array.isRequired,
		}),
	}).isRequired,
	location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
	query PortfolioQuery {
		allMdx(
			sort: { fields: [frontmatter___date], order: DESC }
			filter: {
				frontmatter: { status: { eq: "publish" } }
				fields: { sourceInstanceName: { eq: "projects" } }
			}
		) {
			edges {
				node {
					excerpt(pruneLength: 150)
				}
				node {
					fields {
						slug
						color
					}
					frontmatter {
						title
						cover {
							childImageSharp {
								gatsbyImageData(
									width: 450
									quality: 50
									layout: CONSTRAINED
									placeholder: BLURRED
								)
							}
						}
					}
				}
			}
		}
	}
`;
