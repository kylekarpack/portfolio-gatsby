import { Container, Spacer, styled } from "@nextui-org/react";
import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../components";

const Content = styled(Container, {
	maxWidth: "55em !important",
	margin: "0 auto",
	lineHeight: "1.1",
	h1: {
		color: "$primary",
		fontSize: "$2xl",
		marginTop: "$16",
	},
	"h1:first-of-type": {
		fontSize: "$4xl",
	},
	h2: {
		marginTop: "$12",
		fontWeight: "$normal",
		fontSize: "$xl",
	},
	h3: {
		fontSize: "$lg",
		fontWeight: "$semibold",
		display: "flex",
		justifyContent: "space-between",
		flexWrap: "wrap",
		margin: "$10 0 $4",
	},
	"ul li": {
		lineHeight: "1.5",
		fontSize: "$sm",
		listStyle: "disc",
		marginLeft: "$4",
	},
});

const Resume = ({
	data: {
		markdownRemark: { html, frontmatter },
	},
}) => {
	return (
		<Layout pathname={`/${frontmatter?.slug}`}>
			<Content>
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</Content>
			<Spacer y={4} />
		</Layout>
	);
};

export default Resume;

export const pageQuery = graphql`
	query {
		markdownRemark(fileAbsolutePath: { glob: "**/pages/resume.md" }) {
			html
			frontmatter {
				slug
			}
		}
	}
`;
