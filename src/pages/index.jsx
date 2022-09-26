/* eslint react/display-name: 0 */
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { darken } from "polished";
import PropTypes from "prop-types";
import React from "react";
import { animated, useSpring, useTrail } from "react-spring";
import styled from "styled-components";
import { Layout, ProjectItem } from "../components";
import { Grid } from "@nextui-org/react";

const Wrapper = styled.div`
	
`;
const MoreWrapper = styled.div`
	
`;

const ImageContainer = styled.div`
	
`;

const Profile = styled(animated.div)`
	
`;

const ListWrapper = styled.div`
	
`;

const Index = ({
	data: {
		allMdx: { edges: projectEdges },
	},
	location,
}) => {
	projectEdges = projectEdges.filter((el) => el.node?.frontmatter?.cover);

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
						<StaticImage
							src="../../static/headshot.jpg"
							width={400}
							layout="constrained"
							placeholder="blurred"
							style={{ borderRadius: "100%" }}
							alt="Kyle headshot"
						/>
					</ImageContainer>
					<div>
						<h1>Kyle Karpack</h1>
						<h2>Software Engineer in Seattle</h2>
						<p>
							Specializing in user-centered engineering for large web
							applications
						</p>
					</div>
				</Profile>

				<hr />

				<h2>Recent Work</h2>
				<Grid.Container gap={2} justify="center">
					{projectEdges.map((item, index) => (
						<Grid xs={12} sm={4} md={3} key={projectEdges[index].node.fields.slug}
						>
							<ProjectItem
								testid={`projectItem-${index}`}
								key={projectEdges[index].node.fields.slug}
								node={projectEdges[index].node}
							/>
						</Grid>
					))}
				</Grid.Container>

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
		allMdx(
			sort: { fields: [frontmatter___date], order: DESC }
			filter: {
				frontmatter: { status: { eq: "publish" } }
				fields: { sourceInstanceName: { eq: "projects" } }
			}
			limit: 8
		) {
			edges {
				node {
					excerpt(pruneLength: 130)
					fields {
						slug
						color
					}
					frontmatter {
						title
						cover {
							childImageSharp {
								gatsbyImageData(
									width: 600
									quality: 60
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
