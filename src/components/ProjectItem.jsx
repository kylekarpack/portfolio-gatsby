import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Card, Col, Row, Button, Text, Spacer } from "@nextui-org/react";

const ProjectItem = ({ node, style, testid }) => (
	<Link to={node.fields.slug} style={{ width: "100%" }} data-testid={testid}>
		<Card css={{ width: "100%" }} isPressable isHoverable>
			<Card.Header css={{ backgroundColor: node.fields.color }}>
				<Col>
					<Text
						h3
						color="white"
						css={{
							margin: 0,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden",
						}}>
						{node.frontmatter.title}
					</Text>
				</Col>
			</Card.Header>
			<Card.Body css={{ padding: 0 }}>
				<GatsbyImage
					style={{ objectFit: "cover", height: "250px" }}
					alt={node.frontmatter.title}
					image={node.frontmatter.cover?.childImageSharp?.gatsbyImageData}
				/>
			</Card.Body>
			<Card.Footer>
				<div>
					<Text
						color="$black"
						size="$xs"
						style={{
							overflow: "hidden",
							"-webkit-line-clamp": "2",
							display: "-webkit-box",
							"-webkit-box-orient": "vertical",
						}}>
						{
							node?.excerpt
								?.replace("Case Study", "")
								?.replace("Project Description", "")
								?.split("Skills Used")[0]
						}
					</Text>

					<Spacer />

					<Row justify="center">
						<Button flat auto rounded color={node.fields.color}>
							<Text
								css={{ color: "inherit", lineClamp: 2 }}
								size="$xs"
								weight="bold"
								transform="uppercase">
								Read More
							</Text>
						</Button>
					</Row>
				</div>
			</Card.Footer>
		</Card>
	</Link>
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
	testid: PropTypes.string.isRequired,
};
