import { Button, Card, Col, Row, Spacer, Text } from "@nextui-org/react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import React from "react";

const ProjectItem = ({ node, testid }) => (
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
);

export default ProjectItem;

ProjectItem.propTypes = {
	node: PropTypes.object.isRequired,
	testid: PropTypes.string.isRequired,
};
