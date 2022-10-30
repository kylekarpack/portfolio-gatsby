import { Spacer } from "@nextui-org/react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { Layout, ProjectGrid } from "../components";

const Portfolio = ({
	data: {
		allMdx: { nodes },
	},
	location,
}) => {
	return (
		<Layout pathname={location.pathname}>
			<h1>Recent Work</h1>
			<Spacer />
			<ProjectGrid nodes={nodes} />
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
