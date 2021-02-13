/* eslint react/display-name: 0 */
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { config, useTrail } from "react-spring";
import styled from "styled-components";
import { Layout, ProjectItem } from "../components";

const Wrapper = styled.div`
	padding: 2vw;
`;
const ListWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-column-gap: 2vw;
	grid-row-gap: 2vw;
	width: 100%;
`;

const Portfolio = ({
	data: {
		allMdx: { edges: projectEdges },
	},
	location,
}) => {
	const trail = useTrail(projectEdges.length, {
		config: config.stiff,
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	return (
		<Layout pathname={location.pathname}>
			<Wrapper>
				<h1>Recent Work</h1>
				<ListWrapper>
					{trail.map((style, index) => (
						<ProjectItem
							testid={`projectItem-${index}`}
							style={style}
							key={projectEdges[index].node.fields.slug}
							node={projectEdges[index].node}
						/>
					))}
				</ListWrapper>
			</Wrapper>
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
					excerpt(pruneLength: 140)
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
								fluid(
									maxWidth: 350
									quality: 50
								) {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
					}
				}
			}
		}
	}
`;
