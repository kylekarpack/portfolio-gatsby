import { Container, globalCss, Spacer, styled, Text } from "@nextui-org/react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import React from "react";
import { animated, config, useSpring } from "react-spring";
import { Layout, SEO } from "../components";

const globalStyles = globalCss({
	p: {
		marginBottom: "1em",
	},
});

const ContentBlock = styled("div", {
	"h2, h3": {
		fontSize: "$2xl",
		margin: "$lg 0 $xs",
		fontWeight: "$bold",
	},
	p: {
		margin: "$lg 0 0",
	},
	pre: {
		margin: 0,
	},
	code: {
		margin: "$6 0",
		whiteSpace: "normal",
		display: "block",
	},
	ul: {
		listStyle: "disc",
	},
});

const Grid = styled("div", {
	display: "grid",
	gridTemplateColumns: "1fr",
	columnGap: "$2xl",
	"@smMin": {
		gridTemplateColumns: "1fr 1fr",
	},
	"@lgMin": {
		gridTemplateColumns: "3fr 2fr",
	},
});

const Project = ({ data: { mdx: postNode }, location, children }) => {
	const project = postNode.frontmatter;

	const ColoredContent = styled(ContentBlock, {
		"h2, h3": {
			color: project.color,
		},
	});

	const titleProps = {
		...useSpring({
			config: config.slow,
			from: { opacity: 0, transform: "translate3d(0, -30px, 0)" },
			to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
		}),
		...{
			borderBottomColor: project.color,
		},
	};
	const infoProps = useSpring({
		config: config.slow,
		delay: 500,
		from: { opacity: 0 },
		to: { opacity: 1 },
	});
	const contentProps = useSpring({
		config: config.slow,
		delay: 1000,
		from: { opacity: 0 },
		to: { opacity: 1 },
	});
	const imageProps = useSpring({
		config: config.slow,
		delay: 500,
		from: { opacity: 0, transform: "translate3d(0, -10%, 0)" },
		to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
	});

	globalStyles();

	return (
		<Layout pathname={location.pathname} customSEO>
			<SEO pathname={location.pathname} postNode={postNode} article />
			<Spacer />
			<Container>
				<animated.div style={titleProps}>
					<Text h1 color={project.color} data-testid="project-title">
						{project.title}
					</Text>
				</animated.div>
				<Grid>
					<ColoredContent>
						<animated.div style={infoProps}>
							<Text h3 style={{ marginTop: 0 }}>
								Date
							</Text>
							<Text>{project.date}</Text>
						</animated.div>
						<animated.div style={contentProps}>{children}</animated.div>
					</ColoredContent>
					<animated.div style={imageProps}>
						{project.cover && (
							<GatsbyImage
								image={project.cover.childImageSharp.gatsbyImageData}
								alt={project.title}
							/>
						)}
					</animated.div>
				</Grid>
			</Container>
		</Layout>
	);
};

export default Project;

Project.propTypes = {
	data: PropTypes.shape({
		mdx: PropTypes.object.isRequired,
	}).isRequired,
	location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
	query ($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			excerpt
			fields {
				slug
			}
			parent {
				... on File {
					mtime
				}
			}
			frontmatter {
				title
				date(formatString: "MMMM YYYY")
				color
				cover {
					childImageSharp {
						gatsbyImageData(quality: 90, layout: FULL_WIDTH)
						resize(width: 800) {
							src
						}
					}
				}
			}
		}
	}
`;
