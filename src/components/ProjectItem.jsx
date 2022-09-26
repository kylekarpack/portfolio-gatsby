import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { animated } from "react-spring";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";

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
		padding: 1.5rem;
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
`;

const ProjectTitle = styled.h2`
	margin-top: 0;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	font-size: 1.2rem;
	line-height: 1;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
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

const ProjectItem = ({ node, style, testid }) => (
	<Card css={{ w: "100%", h: "400px" }} isPressable isHoverable>
		<Card.Header>
			<Col>
				<Text h3 color="black">
				{node.frontmatter.title}
				</Text>
			</Col>
		</Card.Header>
		<Card.Body css={{ padding: 0 }}>
			{/* <Card.Image
				src="https://nextui.org/images/card-example-6.jpeg"
				width="100%"
				height="100%"
				objectFit="cover"
				alt="Card example background"
			/> */}
			<GatsbyImage
			style={{objectFit:"cover"}}
				alt={node.frontmatter.title}
				image={node.frontmatter.cover?.childImageSharp?.gatsbyImageData}
			/>
		</Card.Body>
		<Card.Footer
			isBlurred
			css={{
				bgBlur: "#ffffff66",
				borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
				bottom: 0,
				zIndex: 1,
			}}>
			<Row>
				<Col>
					<Text color="#000" size={12}>
						Available soon.
					</Text>
					<Text color="#000" size={12}>
						Get notified.
					</Text>
				</Col>
				<Col>
					<Row justify="flex-end">
						<Button flat auto rounded color={node.fields.color}>
							<Text
								css={{ color: "inherit" }}
								size={12}
								weight="bold"
								transform="uppercase">
								Read More
							</Text>
						</Button>
					</Row>
				</Col>
			</Row>
		</Card.Footer>
	</Card>
	// <Item key={node.fields.slug} style={style} data-testid={testid}>
	// 	<ImageContent>
	// 		<Content>
	// 			<ImageWrapper>
	// 				<GatsbyImage
	// 					alt={node.frontmatter.title}
	// 					image={node.frontmatter.cover?.childImageSharp?.gatsbyImageData}
	// 				/>
	// 			</ImageWrapper>
	// 			<Link to={node.fields.slug}>
	// 				<Overlay
	// 					style={{ backgroundColor: node.fields.color, opacity: 0.95 }}
	// 				/>
	// 				<ProjectTitle>{node.frontmatter.title}</ProjectTitle>
	// 				<p>
	// 					{
	// 						node?.excerpt
	// 							?.replace("Case Study", "")
	// 							?.replace("Project Description", "")
	// 							?.split("Skills Used")[0]
	// 					}
	// 				</p>
	// 			</Link>
	// 		</Content>
	// 	</ImageContent>
	// 	<Link to={node.fields.slug}>
	// 		<TextContent customcolor={node.fields.color}>
	// 			<h2>{node.frontmatter.title}</h2>
	// 		</TextContent>
	// 	</Link>
	// </Item>
);

export default ProjectItem;

ProjectItem.propTypes = {
	node: PropTypes.object.isRequired,
	style: PropTypes.object.isRequired,
	testid: PropTypes.string.isRequired,
};
