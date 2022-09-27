import { Button, Container, Grid, Spacer, Text } from "@nextui-org/react";
import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import React from "react";
import { useTrail } from "react-spring";
import { Layout, ProjectItem } from "../components";

const Index = ({
	data: {
		allMdx: { edges: projectEdges },
	},
	location,
}) => {
	projectEdges = projectEdges.filter((el) => el.node?.frontmatter?.cover);

	const trail = useTrail(projectEdges.length, {
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	return (
		<Layout pathname={location.pathname}>
			<Container>
				<Grid.Container css={{ padding: "4em 0" }} gap={4}>
					<Grid xs={6} sm={3} md={2}>
						<StaticImage
							src="../../static/headshot.jpg"
							width={400}
							layout="constrained"
							placeholder="blurred"
							alt="Kyle headshot"
							style={{ aspectRatio: "1 / 1", borderRadius: "100%" }}
						/>
					</Grid>
					<Grid>
						<Text h1>Kyle Karpack</Text>
						<Text h2>Software Engineer in Seattle</Text>
						<Text size="$lg">
							Specializing in user-centered engineering for large web
							applications
						</Text>
					</Grid>
				</Grid.Container>

				<Spacer y={2} />

				<Text h2>Recent Work</Text>
				<Grid.Container gap={2} justify="center">
					{trail.map((style, index) => (
						<Grid
							xs={12}
							sm={4}
							md={3}
							key={projectEdges[index].node.fields.slug}
							style={style}>
							<ProjectItem
								testid={`projectItem-${index}`}
								key={projectEdges[index].node.fields.slug}
								node={projectEdges[index].node}
							/>
						</Grid>
					))}
				</Grid.Container>

				<Grid.Container justify="center" css={{ padding: "2em 0" }}>
					<Grid>
						<Link to="/portfolio">
							<Button>View More</Button>
						</Link>
					</Grid>
				</Grid.Container>
			</Container>
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
