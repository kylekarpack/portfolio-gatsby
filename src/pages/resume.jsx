import { Spacer, styled } from "@nextui-org/react";
import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../components";

const Content = styled("div", {
	maxWidth: "55em !important",
	margin: "0 auto",
	lineHeight: "1.1",
	h1: {
		color: "$primary",
		fontSize: "$2xl",
		marginTop: "$14",
	},
	"h1:first-of-type": {
		fontSize: "$4xl",
		marginTop: 0
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
	location,
	data: {
		markdownRemark: { html },
	},
}) => {
	return (
		<Layout pathname={location.pathname} fixed>
			<Content>
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</Content>
			<Spacer y={2} />
		</Layout>
	);
};

export default Resume;

export const pageQuery = graphql`
	query {
		markdownRemark(fileAbsolutePath: { glob: "**/pages/resume.md" }) {
			html
		}
	}
`;
