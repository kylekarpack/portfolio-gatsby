/* eslint react/display-name: 0 */
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { darken } from "polished";
import PropTypes from "prop-types";
import React from "react";
import { animated, useSpring, useTrail } from "react-spring";
import styled from "styled-components";
import { Layout, ProjectItem } from "../components";

const Wrapper = styled.div`
	padding: 2vw;
	color: #555;
	hr {
		border-top: 1px solid #eee;
	}
`;
const MoreWrapper = styled.div`
	text-align: center;
	margin-top: 4em;
	a {
		background: ${(props) => props.theme.brand.primary};
		border: 1px solid ${(props) => darken(0.05, props.theme.brand.primary)};
		transition: all 0.25s ease-in-out;
		color: #fff;
		font-size: 1.3rem;
		padding: 0.75rem 2rem;
		&:hover {
			box-shadow: 0 0 4px ${(props) => props.theme.brand.primary};
			background: ${(props) => darken(0.1, props.theme.brand.primary)};
		}
	}
`;

const ImageContainer = styled.div`
	align-self: center;
	text-align: center;
	max-width: 10em;
	max-height: 10em;
`;

const Profile = styled(animated.div)`
	h1 {
		color: ${(props) => props.theme.brand.primary};
	}
	h1,
	h2,
	p {
		margin: 0;
		line-height: 1.5;
	}
	h2 {
		font-size: 1.2rem;
	}
	img {
		border-radius: 100%;
		max-width: 100%;
	}
	display: grid;
	grid-template-columns: minmax(6em, 1fr) 12fr;
	grid-column-gap: 2vw;
	margin-bottom: 2vh;
	padding-bottom: 2vh;
	width: 100%;
`;

const ListWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	grid-column-gap: 2vw;
	grid-row-gap: 2vw;
	width: 100%;
`;

const Index = ({
	data: {
		allMdx: { edges: projectEdges },
		headshot,
	},
	location,
}) => {
	const titleProps = useSpring({
		from: { opacity: 0, transform: "translate3d(0, -30px, 0)" },
		to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
	});

	const trail = useTrail(projectEdges.length, {
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	return (
		<Layout pathname={location.pathname}>
			<Wrapper>
				<Profile style={titleProps}>
					<ImageContainer>
						<GatsbyImage
							image={headshot.childImageSharp.gatsbyImageData}
							alt="Kyle headshot"
						/>
					</ImageContainer>
					<div>
						<h1>Kyle Karpack</h1>
						<h2>Software Engineer in Seattle</h2>
						<p>
							Specializing in user-centered design for large web applications
						</p>
					</div>
				</Profile>

				<hr />

				<h2>Recent Work</h2>
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

				<MoreWrapper>
					<a className="btn" href="/portfolio">
						View More
					</a>
				</MoreWrapper>
			</Wrapper>
		</Layout>
	);
};

export default Index;

Index.propTypes = {
	data: PropTypes.shape({
		allMdx: PropTypes.shape({
			edges: PropTypes.array.isRequired,
		}),
	}).isRequired,
	location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
	query IndexQuery {
		headshot: file(relativePath: { eq: "headshot.jpg" }) {
			childImageSharp {
				gatsbyImageData(width: 400, layout: CONSTRAINED)
			}
		}
		allMdx(
			sort: { fields: [frontmatter___date], order: DESC }
			filter: {
				frontmatter: { status: { eq: "publish" } }
				fields: { sourceInstanceName: { eq: "projects" } }
			}
			limit: 5
		) {
			edges {
				node {
					excerpt(pruneLength: 140)
					fields {
						slug
						color
					}
					frontmatter {
						title
						cover {
							childImageSharp {
								gatsbyImageData(width: 600, quality: 60, layout: CONSTRAINED)
							}
						}
					}
				}
			}
		}
	}
`;
