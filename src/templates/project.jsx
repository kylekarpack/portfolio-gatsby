import { Container, Spacer, styled as styled1, Text } from "@nextui-org/react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import React from "react";
import { animated, config, useSpring } from "react-spring";
import styled from "styled-components";
import { Layout, SEO } from "../components";

const ContentBlock = styled.div`
	h2,
	h3 {
		color: ${(props) =>
			props.customcolor ? props.customcolor : props.theme.colors.grey};
		font-size: 1.1rem;
		font-weight: 700;
		margin: 1.5em 0 0;
	}
	p {
		margin: 1em 0 0;
	}
	code {
		margin 1em 0;
		white-space: normal;
		display: block;
	}
	ul {
		list-style: disc;
	}
`;

const Grid = styled1(Text, {
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

	return (
		<Layout pathname={location.pathname} customSEO>
			<SEO pathname={location.pathname} postNode={postNode} article />
			<Spacer />
			<Container>
				<Text h1 color={project.color} data-testid="project-title">
					<animated.div style={titleProps}>{project.title}</animated.div>
				</Text>
				<Grid>
					<div>
						<animated.div style={infoProps}>
							<ContentBlock customcolor={project.color}>
								<h3>Date</h3>
								<p>{project.date}</p>
							</ContentBlock>
						</animated.div>
						<ContentBlock customcolor={project.color}>
							<animated.div style={contentProps}>{children}</animated.div>
						</ContentBlock>
					</div>
					<div>
						<animated.div style={imageProps}>
							{project.cover && (
								<GatsbyImage
									image={project.cover.childImageSharp.gatsbyImageData}
									alt={project.title}
								/>
							)}
						</animated.div>
					</div>
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
