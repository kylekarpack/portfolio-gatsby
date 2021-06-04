import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { animated } from "react-spring";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";

const Item = styled(animated.div)`
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
	background: #fff;
`;

const TextContent = styled.div`
	border-bottom: 5px solid
		${(props) =>
			props.customcolor ? props.customcolor : props.theme.colors.grey};
	padding: 0.1em 1em;
	h2 {
		color: #444;
		font-size: 1.2rem;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: 100%;
	}
`;

const ImageContent = styled(animated.div)`
	position: relative;
	&:before {
		content: "";
		display: block;
		padding-top: 100%;
	}
`;

const Content = styled.div`
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
	word-break: break-word;

	p {
		font-weight: 300;
	}

	a {
		color: #fff;
		height: 100%;
		left: 0;
		opacity: 0;
		padding: 2vw;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 10;
		transition: all 0.3s ease-in-out;
		text-decoration: none;
		overflow: hidden;

		&:hover {
			color: #fff;
			opacity: 1;
			text-decoration: none;
		}
	}
	h2 {
		margin-top: 0;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		font-size: 1.2rem;
		line-height: 1;
	}
`;

const ImageWrapper = styled.div`
	> div {
		height: 100%;
		left: 0;
		position: absolute !important;
		top: 0;
		width: 100%;

		> div {
			position: static !important;
		}
	}
`;

const Overlay = styled.div`
	background-color: ${(props) => props.theme.brand.primary};
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: -2;
`;

const TracedGlow = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	object-fit: cover;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: 0.08;
	filter: invert(100%);
	z-index: -1;
`;

const ProjectItem = ({ node, style, testid }) => (
	<Item key={node.fields.slug} style={style} data-testid={testid}>
		<ImageContent>
			<Content>
				<ImageWrapper>
					<GatsbyImage image={node.frontmatter.cover?.childImageSharp?.gatsbyImageData} />
				</ImageWrapper>
				<Link to={node.fields.slug}>
					<TracedGlow
						src={node.frontmatter.cover?.childImageSharp?.gatsbyImageData?.tracedSVG}
						alt=""
					/>
					<Overlay style={{ backgroundColor: node.fields.color }} />
					<h2>{node.frontmatter.title}</h2>
					<p>
						{
							node?.excerpt
								?.replace("Case Study", "")
								?.replace("Project Description", "")
								?.split("Skills Used")[0]
						}
					</p>
				</Link>
			</Content>
		</ImageContent>
		<Link to={node.fields.slug}>
			<TextContent customcolor={node.fields.color}>
				<h2>{node.frontmatter.title}</h2>
			</TextContent>
		</Link>
	</Item>
);

export default ProjectItem;

ProjectItem.propTypes = {
	node: PropTypes.object.isRequired,
	style: PropTypes.object.isRequired,
	testid: PropTypes.string.isRequired,
};
