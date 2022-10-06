import { Button, Card, Col, Row, Spacer, Text } from "@nextui-org/react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { trimStart } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { animated } from "react-spring";

const ProjectItem = ({ node, style, testid }) => (
	<animated.div style={{ ...style, maxWidth: "100%", boxShadow: "inset 0 0 0 0.09px transparent" }}>
		<Link
			to={`/portfolio/${trimStart(node.fields.slug, "/")}`}
			style={{ width: "100%" }}
			data-testid={testid}>
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
							size="$xs"
							style={{
								overflow: "hidden",
								WebkitLineClamp: "2",
								display: "-webkit-box",
								WebkitBoxOrient: "vertical",
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
									css={{ lineClamp: 2, color: "$black" }}
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
	</animated.div>
);

export default ProjectItem;

ProjectItem.propTypes = {
	node: PropTypes.object.isRequired,
	testid: PropTypes.string.isRequired,
	style: PropTypes.any,
};
