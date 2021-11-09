import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import styled from "styled-components";
import { Container, Layout } from "../components";

const Content = styled(Container)`
	line-height: 1.2;
	ul li {
		line-height: 1.5;
		font-size: 0.9rem;
	}
	p {
		font-size: 1rem;
	}
	p > span,
	p > a > span {
		font-size: 1em !important;
	}
	h1:first-of-type {
		font-size: 2rem;
	}
	h1 {
		font-size: 1.4rem;
		margin-top: 3rem;
		color: ${(props) => props.theme.brand.primary};
	}
	h2 {
		margin-top: 2rem;
		font-weight: 400;
		font-size: 1.2rem;
		span:first-child {
			font-weight: 700;
		}
	}
	h3 {
		font-size: 1rem;
		font-weight: 500;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: 1.5rem 0 0;
		em {
			font-weight: 500;
		}
	}
	h1,
	h2,
	h3 {
		> span {
			font-size: 1em !important;
		}
	}
`;

const Resume = ({ data: { mdx: postNode }, location }) => {
	return (
		<Layout pathname={location.pathname}>
			<Content type="text">
				<MDXRenderer>{postNode.body}</MDXRenderer>
			</Content>
		</Layout>
	);
};

export default Resume;

export const pageQuery = graphql`
	query ResumeQuery {
		mdx(slug: { eq: "resume" }) {
			body
			fields {
				slug
			}
		}
	}
`;
