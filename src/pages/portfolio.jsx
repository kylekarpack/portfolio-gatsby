import { Grid, Spacer } from "@nextui-org/react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { useTrail } from "react-spring";
import { Layout, ProjectItem } from "../components";

const Portfolio = ({
	data: {
		allMdx: { nodes },
	},
	location,
}) => {
	const trail = useTrail(nodes.length, {
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	return (
		<Layout pathname={location.pathname}>
			<h1>Recent Work</h1>
			<Spacer />
			<Grid.Container gap={2} justify="center">
				{trail.map((style, index) => {
					const node = nodes[index];
					return (
						<Grid xs={12} sm={4} md={3} xl={2} key={node.fields.slug}>
							<ProjectItem
								testid={`projectItem-${index}`}
								node={node}
								style={style}
							/>
						</Grid>
					);
				})}
			</Grid.Container>
		</Layout>
	);
};

export default Portfolio;

Portfolio.propTypes = {
	data: PropTypes.shape({
		allMdx: PropTypes.shape({
			nodes: PropTypes.array.isRequired,
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
			nodes {
				excerpt(pruneLength: 150)
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
`;
