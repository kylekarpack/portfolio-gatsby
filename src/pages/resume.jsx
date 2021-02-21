import React from "react";
import { Layout, Container } from "../components";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Content = styled(Container)`
	line-height: 1.42;
	ul li {
		line-height: 1.42;
	}
	h1.title {
		font-size: 2.4rem;
	}
	h1 {
		font-size: 1.4rem;
		margin-top: 2rem;
	}
	h2 {
		font-size: 1.2rem;
	}
	h3 {
		font-size: 1rem;
		display: flex;
		justify-content: space-between;
	}
`;

const Resume = ({ data: { doc }, location }) => {
	console.log(doc);
	return (
		<Layout pathname={location.pathname}>
			<Content type="text">
				{/* <MDXRenderer>{doc.childMdx.body}</MDXRenderer> */}
				<div
					dangerouslySetInnerHTML={{ __html: doc.childMarkdownRemark.html }}
				/>
			</Content>
		</Layout>
	);
};

export default Resume;

export const pageQuery = graphql`
	query($slug: String) {
		doc: googleDocs(slug: { eq: $slug }) {
			path
			childMarkdownRemark {
				html
			}
			childMdx {
				body
			}
		}
	}
`;
